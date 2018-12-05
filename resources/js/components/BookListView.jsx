import React, { Component } from 'react';

import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";
import { fetchBookList } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";

export class BookListView extends Component {
    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    render() {
        const books = this.props.books;
        if(isEmpty(books)){
            return <Loading />;
        }

        const bookName = [];
        for(let i = 0 ; i < books.length ; i++) {
            bookName[i] = new Array(2);
        }
        
        for(let allBooks = books.length, bookIndex = 0 ; 0 < allBooks ; allBooks--, bookIndex++) {
            for(let newLine = 0 ; newLine < 2; newLine++) {
                if( books[bookIndex].name != "") {
                    if(newLine == 0) {
                        bookName[bookIndex][newLine] = books[bookIndex].name.substr(0,17);
                    } else if(newLine == 1 && books[bookIndex].name.charAt(18) != "") {
                        bookName[bookIndex][newLine] = books[bookIndex].name.substr(18);
                    } else {
                        bookName[bookIndex][newLine] = " ";
                    }
                } else {
                        bookName[bookIndex][newLine] = " ";
                }
            }
        }

        const booksInfo = books.map((book, index) => {
            return (
                <div className="d-inline-block" key={index}>
                    <img hspace="50" src={book.cover}/>
                    <pre>{bookName[index][0]}</pre>
                    <pre>{bookName[index][1]}</pre>
                    <br/>
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
