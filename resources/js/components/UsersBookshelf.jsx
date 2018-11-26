import React, { Component } from "react";
import { fetchUsersBookshelf } from "../actions.js";
import { store } from "../index";

export class UsersBookshelf extends Component {
    constructor(props){
        super(props);
        console.log("constructor: UsersBookshelf")
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchUsersBookshelf(userId));
    };

    componentDidMount(){
        console.log("componentDidMount: UsersBookshelf");
    };

    render(){
        const userShelf = this.props.usersBookshelf;
        console.table(userShelf);
        const bookCover = [];
        const bookName = [];

        userBooks.forEach((userBook) => {
            bookCover.push(<td><img src={userBook.cover} /></td>);
            bookName.push(<td>{userBook.name}</td>);
        });

        return (
            <table border="1"><tbody>
                <tr>{bookCover}</tr>
                <tr>{bookName}</tr>
            </tbody></table>
        );
    }
}
