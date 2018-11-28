import React, { Component } from "react";
import { fetchUsersBookshelf } from "../actions.js";
import { store } from "../store";
import { isObjectEmpty } from "../utils.js";

export class UsersBookshelf extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchUsersBookshelf(userId));
    };

    render(){
        const usersShelf = this.props.usersBookshelf;
        if(isObjectEmpty(usersShelf)){
            {/* 後々ローディング画面に置き換え */}
            return <div></div>;
        }

        {/* ユーザーが所持する本の情報を本ビューに加工 */}
        const booksInfo = usersShelf.books.map((userBook, index) => {
            return (
                <div className="d-inline-block" key={index}>
                    <img src={userBook.cover}/>
                    <pre>{userBook.name}</pre>
                </div>
            );
        });

        {/* 本棚の形に加工 */}
        const bookshelf = [];
        for(let index = 0, key = booksInfo.length ; index < booksInfo.length; index++){
            bookshelf.push(booksInfo[index]);
            {/* 改行する */}
            if(index % 3 == 2 || booksInfo.length == (index+1)){
                bookshelf.push(<div key={key++}></div>);
            }
        }

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {bookshelf}
                    </div>
                </div>
            </div>
        );
    }
}
