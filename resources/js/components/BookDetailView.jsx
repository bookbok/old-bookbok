import React, { Component } from "react";
import { fetchBookDetail, storeISBNToUserBookDirect } from "../actions.js";
import { store } from "../store";
import { getAuthUser, isEmpty, toLines } from "../utils";

import { Link } from 'react-router-dom';
import { Loading } from "./shared/Loading";
import { BookInfo } from "./shared/book/BookInfo";

export class BookDetailView extends Component {
    constructor(props){
        super(props);

        this.state={ isInvalid: false, invalidMessage: ""};
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount(){
        const bookId = parseInt(this.props.match.params.id);
        store.dispatch(fetchBookDetail(bookId));
    }

    handleRegister(e){
        e.preventDefault();

        const user = getAuthUser();
        if(isEmpty(user)){
            return this.props.history.push('/login');
        }

        storeISBNToUserBookDirect(user.id, this.props.bookDetail.isbn).then(res => {
            if(res.status === 401){
                this.setState({ isInvalid: true, invalidMessage: 'ログインが必要です' });
                throw new Error();
            }else if(!res.ok){
                res.json().then(json => {
                    this.setState({ isInvalid: true, invalidMessage: json.userMessage });
                });
                throw new Error();
            }
            return res.json();
        }).then(res => {
            this.props.history.push(`/users/${res.user.id}/user_books/${res.id}`);
        }).catch(()=>{});
    }

    render() {
        const book = this.props.bookDetail;
        if(isEmpty(book)){
            return <Loading />;
        }

        const reviews = book.reviews.map(review => (
            <div key={review.id}>
                <div className="card p-2">
                    <pre className="userd-bok-user border-bottom">
                        <Link to={`/users/${review.user_id}`}>
                            {review.name}
                        </Link>
                        &nbsp;さんのレビュー
                    </pre>
                    <pre className="userd-bok-body mt-2 mr-2">{review.body}</pre>
                </div>
            </div>
        ));

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 main-content book-detail-wrapper clearfix">
                        <div className="mb-3">
                            <Link to="/books">← 戻る</Link>
                        </div>

                        <div className="float-right">
                            <form onSubmit={this.handleRegister}>
                                <button type="submit" className="btn btn-success">本棚に追加</button>
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
