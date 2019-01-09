import React, { Component } from "react";
import { fetchBookDetail, storeISBNToUserBookDirect } from "../actions.js";
import { store } from "../store";
import { getAuthUser, isEmpty } from "../utils";
import { Loading } from "./shared/Loading";
import { BookInfo } from "./shared/book/BookInfo";

export class BookDetailView extends Component {
    constructor(props){
        super(props);

        this.state={ isbn: null, isInvalid: false, invalidMessage: ""};
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

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 main-content p-5 clearfix">
                        <div className="float-right">
                            <form onSubmit={this.handleRegister}>
                                <button type="submit" className="btn btn-success">本棚に追加</button>
                            </form>
                        </div>
                        <BookInfo book={book} />
                    </div>
                </div>
            </div>
        );
    }
}
