import React, { Component } from 'react';

export class BookView extends Component {
    render() {
        const book = this.props.book;
        let bookName;
        
        if(book.name != "") {
            const width = screen.width <= 750 ? 12 : 14;
            if(book.name.charAt(width+1) != "") {
                bookName = <pre className="book-view-pre">{book.name.slice(0, width)}<br/>{book.name.slice(width)}</pre>;
            } else {
                bookName = <pre className="book-view-pre">{book.name.slice(0, width)}<br/><br/></pre>;
            }
        } else {
                bookName = <pre className="book-view-pre"><br/><br/></pre>;
        }

        return (
            <div className="d-inline-block col-md-4 col-4"> 
                <img className="book-view-img" src={book.cover}/>
                {bookName}
                <br/>
            </div>
         );

    }
}
