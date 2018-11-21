import React, { Component } from "react";
import { fetchBookDetail } from "../actions.js";
import { store } from "../index";

export class UsersBookshelf extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        //const bookId = parseInt(this.props.match.params.id);
        //store.dispatch(fetchBookDetail(bookId));
    };

    render(){
        const bookCover = [];
        const bookName = [];
        const userBooks = [
            {cover: "userBook1.png", name: "userBook1"},
            {cover: "userBook2.png", name: "userBook2"},
            {cover: "userBook3.png", name: "userBook3"},
            {cover: "userBook4.png", name: "userBook4"},
            {cover: "userBook5.png", name: "userBook5"},
        ];

        userBooks.forEach((userBook) => {
            bookCover.push(<td><img src={userBook.cover} /></td>);
            bookName.push(<td>{userBook.name}</td>);
        })

        //const book = this.props.bookDetail;

        return (
            <table border="1"><tbody>
                <tr>{bookCover}</tr>
                <tr>{bookName}</tr>
            </tbody></table>
        );
    }
}
