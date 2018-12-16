import React, { Component } from "react";
import { fetchUserBookshelf } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { BookView } from "./BookView.jsx";

export class UserBookshelf extends Component {
    componentDidMount(){
        this.userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchUserBookshelf(this.userId));
    };

    render(){
        const userShelf = this.props.userBookshelf;
        if(isEmpty(userShelf)){
            return <Loading />;
        }

        {/* ユーザーが所持する本の情報を本ビューに加工 */}
        const booksInfo = userShelf.books.map((book, i) => {
            return <BookView book={book} link={`/users/${this.userId}/user_books/${book.pivot.id}`} key={i} />;
        });

        {/* 本棚の形に加工 */}
        const bookshelf = [];
        for(let i = 0, key = booksInfo.length ; i < booksInfo.length; i++){
            bookshelf.push(booksInfo[i]);
            {/* 改行する */}
            if(i % 3 == 2 || booksInfo.length == i + 1){
                bookshelf.push(<div key={key++}></div>);
            }
        }

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {bookshelf}
                    </div>
                </div>
            </div>
        );
    }
}
