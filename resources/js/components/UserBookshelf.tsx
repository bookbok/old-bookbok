import * as React from 'react';
import * as ResourceTypes from '../resource-types';
import { fetchUserBookshelf, fetchUser, loading, loaded } from '../actions';
import { store } from '../store';

import { Loading } from './shared/Loading';
import { BookView } from './BookView';
import { MyPageTabs } from './shared/user/MyPageTabs';
import { FloatUserInfo } from './shared/user/FloatUserInfo';

interface Props {
    match: ResourceTypes.Matcher;
    loading: boolean;
    user?: ResourceTypes.User;
    userBookshelf?: ResourceTypes.UserBooks;
}

const fetchUserBookshelfActions = userId => {
    store.dispatch(loading());
    Promise.all([fetchUserBookshelf(userId), fetchUser(userId)]).then(() => {
        store.dispatch(loaded());
    });
};

export class UserBookshelf extends React.Component<Props> {
    private userId?: number;
    componentDidMount() {
        fetchUserBookshelfActions(this.props.match.params.id);
    }

    render() {
        this.userId = parseInt(this.props.match.params.id);
        const { userBookshelf, user } = this.props;
        const shelfView = view => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <MyPageTabs isUserBooks userId={this.userId} />
                            <div className="mt-4 book-list-wrapper">{view}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (!user) {
            return <Loading />;
        } else if (this.props.loading || !userBookshelf) {
            return shelfView(<Loading />);
        }

        {
            /* ユーザーが所持する本の情報を本ビューに加工 */
        }
        // @ts-ignore
        const bookshelf = userBookshelf.books.map(book => {
            return (
                <BookView
                    book={book}
                    // @ts-ignore
                    link={`/users/${this.userId}/user_books/${book.pivot.id}`}
                    key={book.id}
                    className="bookshelf-box"
                />
            );
        });

        return shelfView(bookshelf);
    }
}

// URL内のid変更を検知して、再度ユーザー情報をfetchするためのデコレーター
import { connect } from 'react-redux';
import { fetchOnIdUpdateDecorator } from '../decorators/FetchOnIdUpdateDecorator';

export default connect(state => state)(
    fetchOnIdUpdateDecorator(({ id }) => {
        fetchUserBookshelfActions(id);
    })(UserBookshelf)
);
