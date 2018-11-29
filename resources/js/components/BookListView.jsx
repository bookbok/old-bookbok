import React, { Component } from 'react';

import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";
import { fetchBookList } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";

export class BookListView extends Component {
    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    render() {
        if(isEmpty(this.props.books)){
            return <div></div>;
        }

        const booksInfo = this.props.books.map((book, index) => {
            return (
                <div className="d-inline-block" key={index}>
                    <img src={book.cover}/>
                    <pre>{book.name}</pre>
                </div>
            );
        });

        const bookList = [];
        for(let index = 0, key = booksInfo.length ; index < booksInfo.length; index++){
            bookList.push(booksInfo[index]);
            if(index % 3 == 2 || booksInfo.length == (index+1)){
                bookList.push(<div key={key++}></div>);
            }
        }

        return(
            <div>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <Search />
                            <ConnectedGenres />
                            <br/>
                            {bookList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
