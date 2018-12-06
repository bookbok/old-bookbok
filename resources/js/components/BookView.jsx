import React, { Component } from 'react';

export class BookView extends Component {
    render() {
        const book = this.props.book;
        const bookName = [];
        
        for(let newLine = 0 ; newLine < 2; newLine++) {
            if(book.name != "") {
                if(newLine == 0) {
                    bookName[newLine] = book.name.substr(0,17);
                } else if(newLine == 1 && book.name.charAt(18) != "") {
                    bookName[newLine] = book.name.substr(18);
                } else {
                    bookName[newLine] = " ";
                }
            } else {
                bookName[newLine] = " ";
            }
        }

        return (
            <div className="d-inline-block">
                <img hspace="50" src={book.cover}/>
                <pre>{bookName[0]}</pre>
                <pre>{bookName[1]}</pre>
                <br/>
            </div>
         );

    }
}
