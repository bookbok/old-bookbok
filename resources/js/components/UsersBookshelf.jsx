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

        {/* ユーザーが所持する本の情報を本ビューに加工 */}
        const booksInfo = usersShelf.books.map((userBook, index) => {
            return (
                <div class="d-flex flex-column" key={index}>
                    <img src={userBook.cover}/>
                    <p>{userBook.name}</p>
                </div>
            );
        });

        {/* 本棚の形に加工 */}
        const bookshelf = booksInfo.map((book, index) => {
            if(index % 3 == 0 && booksInfo.length == (index+1)){
                console.log("1冊目かつ最後");
                return (
                    <div className="d-flex" key={index}>{book}</div>
                );
            } else if(index % 3 == 0){
                console.log("一番左の本");
                return (
                    <div className="d-flex" key={index}>{book}</div>
                );
            } else if(index % 3 == 2 || booksInfo.length == (index+1)){
                console.log("一番右の本");
                return (
                    <div key={index}>{book}</div>
                );
            } else {
                console.log("真ん中の本");
                return (
                    <div key={index}>{book}</div>
                );
            }
        });

        return (
            <div class="d-flex flex-column">
                {bookshelf}
            </div>
        );
    }
}
