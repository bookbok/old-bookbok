import React, { Component } from 'react';

import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";
import { fetchBookList } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { BookView } from "./BookView.jsx";

export class BookListView extends Component {
    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    render() {
        const books = this.props.books;
        if(isEmpty(books)) {
            return <Loading />;
        }
        
        const booksInfo = books.map((book, i) => {
                return <BookView book={book} key={i} />
        });

        const bookList = [];
        for(let index = 0, key = booksInfo.length ; index < booksInfo.length; index++) {
            bookList.push(booksInfo[index]);
            if(index % 3 == 2 || booksInfo.length == (index+1)) {
                bookList.push(<div key={key++}></div>);
            }
        }

        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div>
                        <Search />
                        <ConnectedGenres />
                        <br/>
                        {bookList}
                    </div>
                </div>
            </div>
        );
    }
}
