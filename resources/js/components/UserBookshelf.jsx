import React, { Component } from "react";
import { fetchUserBookshelf, fetchUser, loading, loaded } from "../actions";
import { store } from "../store";
import { isEmpty } from "../utils";

import { Loading } from "./shared/Loading";
import { BookView } from "./BookView";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

const fetchUserBookshelfActions = (userId) => {
    store.dispatch(loading());
    Promise.all([
        fetchUserBookshelf(userId),
        fetchUser(userId),
    ]).then(() => {
        store.dispatch(loaded());
    });
}

export class UserBookshelf extends Component {
    componentDidMount(){
        this.userId = parseInt(this.props.match.params.id);
        fetchUserBookshelfActions(this.userId);
    }

    render(){
        const { userBookshelf, user } = this.props;
        const shelfView = (view) => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <MyPageTabs isUserBooks userId={this.userId} />
                            <div className="mt-4 book-list-wrapper">
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(!user){
            return <Loading />;
        } else if(this.props.loading || !userBookshelf) {
            return shelfView(<Loading />)
        }

        {/* ユーザーが所持する本の情報を本ビューに加工 */}
        const bookshelf = userBookshelf.books.map(book => {
            return <BookView
                        book={book}
                        link={`/users/${this.userId}/user_books/${book.pivot.id}`}
                        key={book.id}
                        className="bookshelf-box" />;
        });

        return (
            shelfView(bookshelf)
        );
    }
}


// URL内のid変更を検知して、再度ユーザー情報をfetchするためのデコレーター
import { connect } from "react-redux";
import { fetchOnIdUpdateDecorator } from '../decorators/FetchOnIdUpdateDecorator';

export default connect(state => state)(
    fetchOnIdUpdateDecorator(({id}) => {
        fetchUserBookshelfActions(id);
    })(
        UserBookshelf
    )
);
