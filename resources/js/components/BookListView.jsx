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
        // initialized
        for(let i = 0 ; i < books.length ; i++) {
            bookName[i] = new Array(2);
            for(let j = 0 ; j < 2 ; j++) {
                bookName[i][j] = new Array(17);
            }
        }
        console.log(this.props.books[0].name.charAt(50));
        
        for(let allBooks = books.length, bookIndex = 0 ; 0 < allBooks ; allBooks--, bookIndex++) {
            for(let newLine = 0 ; newLine < 2; newLine++) {
                for(let charNum = 0 ; charNum < 17; charNum++) {
                    if(newLine==1 && books[bookIndex].name.charAt(charNum+17)!="") {
                        if(newLine==1 && charNum!=14) {
                            bookName[bookIndex][newLine][charNum] = books[bookIndex].name.charAt(charNum+17);
                        } 
                        else if(newLine==1 && charNum==14) {
                            bookName[bookIndex][newLine][charNum] = "...";
                            break;
                        } else {
                            bookName[bookIndex][newLine][charNum] = books[bookIndex].name.charAt(charNum+17);
                        }
                    } else if (newLine==0 && books[bookIndex].name.charAt(charNum)!="") {
                                
                        bookName[bookIndex][newLine][charNum] = books[bookIndex].name.charAt(charNum);
                    }
                }
            }
        }

        const booksInfo = books.map((book, index) => {
            var i = 0;
            return (
                <div className="d-inline-block" key={index}>
                    <img src={book.cover}/>
                    <pre>{bookName[0][0]}</pre>
                    <pre>{bookName[0][1]}</pre>
                    <br/>
                </div>
            );
            i++;
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
