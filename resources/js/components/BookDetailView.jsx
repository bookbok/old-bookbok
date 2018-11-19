import React, { Component } from "react";
import { fetchBookDetail } from "../actions.js";
import { store } from "../index";

export class BookDetailView extends Component {
    constructor(props){
        super(props);
        store.dispatch(fetchBookDetail());
    };

    render() {
        const imgLink = 'http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api';
        const book = this.props.bookDetail;

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src='{imgLink}' /></td>
                    <td><p>{book.name}</p></td>
                </tr>
                <tr>
                    <td colSpan="2">概要</td>
                </tr>
                <tr>
                    <td colSpan="2"><p>{book.description}</p></td>
                </tr>
            </tbody></table>
        );
    }
}
