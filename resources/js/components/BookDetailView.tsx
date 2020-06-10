import * as React from 'react';
import * as ResourceTypes from '../resource-types';
import { fetchBookDetail, storeISBNToUserBookDirect, setAlertMessage } from '../actions';
import { store } from '../store';
import { getAuthUser, isEmpty } from '../utils';

import { Link } from 'react-router-dom';
import { Loading } from './shared/Loading';
import { BookInfo } from './shared/book/BookInfo';
import BackButtonArea from './shared/BackButtonArea';

interface BookWithReviews extends ResourceTypes.Book {
    reviews?: Array<ResourceTypes.Review>;
}

interface Props {
    match: ResourceTypes.Matcher;
    history: ResourceTypes.Route;
    bookDetail?: BookWithReviews;
}

export class BookDetailView extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        const bookId = parseInt(this.props.match.params.id);
        store.dispatch(fetchBookDetail(bookId));
    }

    handleRegister(e) {
        e.preventDefault();
        if (!this.props.bookDetail) return;

        const user = getAuthUser();
        if (isEmpty(user)) {
            store.dispatch(
                setAlertMessage('warning', {
                    __html: "<div><a href='/login'>ログイン</a>してください</div>",
                })
            );
            return;
        }

        storeISBNToUserBookDirect(user.id, this.props.bookDetail.isbn)
            .then(res => {
                if (res.status === 401) {
                    throw new Error();
                } else if (!res.ok) {
                    res.json().then(json => {
                        store.dispatch(
                            setAlertMessage('warning', { __html: `<div>${json.userMessage}</div>` })
                        );
                    });
                    throw new Error();
                }
                return res.json();
            })
            .then(res => {
                this.props.history.push(`/users/${res.user.id}/user_books/${res.id}`);
            })
            .catch(() => {});
    }

    render() {
        const book = this.props.bookDetail;
        if (isEmpty(book)) {
            return <Loading />;
        }

        // @ts-ignore
        const reviews = book.reviews.map(review => (
            <div key={review.id}>
                <div className="card p-2">
                    <pre className="userd-bok-user border-bottom">
                        <Link to={`/users/${review.user_id}`}>{review.user_name}</Link>
                        &nbsp;さんのレビュー
                    </pre>
                    <pre className="userd-bok-body mt-2 mr-2">{review.body}</pre>
                </div>
            </div>
        ));

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="main-content clearfix">
                        <BackButtonArea to="/books" />
                        <div className="float-right">
                            <form onSubmit={this.handleRegister}>
                                <button type="submit" className="btn btn-success">
                                    本棚に追加
                                </button>
                            </form>
                        </div>
                        <BookInfo book={book} />

                        <h3 className="mt-5">最近のレビュー</h3>
                        <div className="mt-4">{reviews}</div>
                    </div>
                </div>
            </div>
        );
    }
}
