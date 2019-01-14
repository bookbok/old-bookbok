import React, { Component } from "react";
import { fetchUserBookshelf, fetchUser } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";

import { Loading } from "./shared/Loading";
import { BookView } from "./BookView.jsx";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

export class UserBookshelf extends Component {
    componentDidMount(){
        this.userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchUserBookshelf(this.userId));
        store.dispatch(fetchUser(this.userId));
    };

    render(){
        const userShelf = this.props.userBookshelf;
        const user = this.props.user;
        const shelfView = (view) => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isUserBooks userId={this.props.match.params.id} />
                            <div className="mt-4 book-list-wrapper">
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(isEmpty(user)){
            return <Loading />;
        } else if(user && isEmpty(userShelf)) {
            return shelfView(<Loading />)
        }

        {/* ユーザーが所持する本の情報を本ビューに加工 */}
        const bookshelf = userShelf.books.map(book => {
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
