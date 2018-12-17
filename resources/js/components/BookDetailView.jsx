import React, { Component } from "react";
import { fetchBookDetail } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";

import { Loading } from "./shared/Loading";
import { BookInfo } from "./shared/book/BookInfo";

export class BookDetailView extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        const bookId = parseInt(this.props.match.params.id);
        store.dispatch(fetchBookDetail(bookId));
    };

    render() {
        const book = this.props.bookDetail;
        if(isEmpty(book)){
            return <Loading />;
        }

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 main-content p-5">
                        <BookInfo book={book} />
                    </div>
                </div>
            </div>
        );
    }
}
