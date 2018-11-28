import React, { Component } from 'react';

import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";
import { fetchBookList } from "../actions.js";
import { store } from "../store";

export class BookListView extends Component {
    constructor(props) {
        super(props);
    };
    
    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    render() {
        const booksInfo = this.props.bookList.map((book, index) => {
            return (
                <div class="d-inline-block" key={index}>
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
                <Search />
                <ConnectedGenres />
                <div class="container mt-4">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            {bookList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }  
}
