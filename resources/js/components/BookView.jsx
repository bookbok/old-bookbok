import React, { Component } from 'react';

export class BookView extends Component {
    render() {
        const books = this.props.books;
        const bookName = [];
        for(let i = 0 ; i < books.length ; i++) {
            bookName[i] = new Array(2);
        }
        
        books.forEach((book, index) => {
            for(let newLine = 0 ; newLine < 2; newLine++) {
                if(book.name != "") {
                    if(newLine == 0) {
                        bookName[index][newLine] = book.name.substr(0,17);
                    } else if(newLine == 1 && book.name.charAt(18) != "") {
                        bookName[index][newLine] = book.name.substr(18);
                    } else {
                        bookName[index][newLine] = " ";
                    }
                } else {
                        bookName[index][newLine] = " ";
                }
            }
        });

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
        for(let index = 0, key = booksInfo.length ; index < booksInfo.length; index++) {
            bookList.push(booksInfo[index]);
            if(index % 3 == 2 || booksInfo.length == (index+1)) {
                bookList.push(<div key={key++}></div>);
            }
        }

        return bookList;
    }
}
