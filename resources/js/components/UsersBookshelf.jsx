import React, { Component } from "react";
import { fetchUsersBookshelf } from "../actions.js";
import { store } from "../store";

export class UsersBookshelf extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchUsersBookshelf(userId));
    };

    isObjectEmpty(obj){
        return !Object.keys(obj).length;
    }

    render(){
        const usersShelf = this.props.usersBookshelf;
        if(this.isObjectEmpty(usersShelf)){
            return <div></div>;
        }
        const bookCover = [];
        const bookName = [];

        usersShelf.books.forEach((userBook, index) => {
            bookCover.push(<td key={index}><img src={userBook.cover} /></td>);
            bookName.push(<td key={index}>{userBook.name}</td>);
        });

        return (
            <table border="1"><tbody>
                {/* いい感じのキーが思いつかなかったからそれっぽい文字列にしておいた */}
                <tr key="bookCover">{bookCover}</tr>
                <tr key="bookName">{bookName}</tr>
            </tbody></table>
        );
    }
}
