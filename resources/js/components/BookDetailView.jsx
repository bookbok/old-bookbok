import React, { Component } from "react";
import { fetchBookDetail } from "../actions.js";
import { store } from "../store";

export class BookDetailView extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        const bookId = parseInt(this.props.match.params.id);
        store.dispatch(fetchBookDetail(bookId));
    };

    render() {
        const book = this.props.bookDetail;

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src={book.cover} /></td>
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
