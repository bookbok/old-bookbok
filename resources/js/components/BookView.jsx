import React, { Component } from 'react';
import { mb_substr, ja2Bit } from '../utils.js';

export class BookView extends Component {
    render() {
        const book = this.props.book;
        let bookName;

        for (var i = 0, jaCnt = 0 ; i < book.name.length; i++) {
            if (ja2Bit(book.name.charAt(i))) {
                jaCnt++;
            }
        }
             
        if(book.name != "") {
            const width = jaCnt < 9 ? 13 : 9;
            const device = screen.width <= 750 ? -2 : 0;
            if(book.name.charAt((width+device)+1) != "") {
                bookName = <pre className="book-view-pre">{mb_substr(book.name, 0, width+device)}<br/>{mb_substr(book.name, width+device, book.name.length)}</pre>;
            } else {
                bookName = <pre className="book-view-pre">{mb_substr(book.name, 0, book.name.length)}<br/><br/></pre>;
            }
        } else {
                bookName = <pre className="book-view-pre"><br/><br/></pre>;
        }

        return (
            <div className="d-inline-block col-md-4 col-4">
                <a href={this.props.link ? this.props.link : "#"}>
                    <img className="book-view-img" src={book.cover}/>
                    {bookName}
                    <br/>
                </a>
            </div>
         );

    }
}
