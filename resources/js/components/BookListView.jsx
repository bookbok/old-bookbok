import React, { Component } from 'react';
import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";

export class BookListView extends Component {
    render() {
        const bookBody = [];
        const bookName = [];
        const books = [
            {name:'c++01', body:'http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'},
            {name:'c++02', body:'http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'},
            {name:'c++03', body:'http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'},
        ];

        books.forEach((book) => {
           bookBody.push(<td><img src={book.body} /></td>);
           bookName.push(<th>{book.name}</th>);
        });

        return(
            <div>
                <Search />
                <ConnectedGenres />
                <table border="1">
                    <tr>
                        {bookBody}
                    </tr>
                    <tr>
                        {bookName}
                    </tr>
                </table>
            </div>
        );
    }  
}
