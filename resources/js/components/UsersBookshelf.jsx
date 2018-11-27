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
                <div class="d-inline-block" key={index}>
                    <img src={userBook.cover}/>
                    <pre>{userBook.name}</pre>
                </div>
            );
        });

        {/* 本棚の形に加工 */}
        const bookshelf = [];
        for(let i=0, key=booksInfo.length ; i<booksInfo.length; i++){
            bookshelf.push(booksInfo[i]);
            if(i % 3 == 2 || booksInfo.length == (i+1)){
                bookshelf.push(<div key={key++}></div>);
            }
        }

        return (
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        {bookshelf}
                    </div>
                </div>
            </div>
        );
    }
}
