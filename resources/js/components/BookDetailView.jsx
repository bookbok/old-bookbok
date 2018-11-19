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
        const bookName = this.props.bookDetail.book_name;
        const bookDisc = "各本の概要を取得して表示";

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src={imgLink} /></td>
                    <td><p>{bookName}</p></td>
                </tr>
                <tr>
                    <td colSpan="2">概要</td>
                </tr>
                <tr>
                    <td colSpan="2"><p>{bookDisc}</p></td>
                </tr>
            </tbody></table>
        );
    }
}
