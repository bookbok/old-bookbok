import React, { Component } from 'react';

export class BookView extends Component {
    render() {
        const book = this.props.book;
        const bookName = [];
        
        if(book.name != "") {
            if(book.name.charAt(18) != "") {
                bookName.push(<pre>{book.name.slice(0, 17)}<br/>{book.name.slice(18)}</pre>);
            } else {
                bookName.push(<pre>{book.name.slice(0, 17)}<br/><br/></pre>);
            }
        } else {
                bookName.push(<pre><br/><br/></pre>);
        }

        return (
            <div className="d-inline-block">
                <img hspace="50" src={book.cover}/>
                {bookName}
                <br/>
            </div>
         );

    }
}
