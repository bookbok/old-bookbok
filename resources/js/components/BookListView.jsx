import React, { Component } from 'react';

import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";
import { fetchBookList } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";

export class BookListView extends Component {
    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    render() {
        const books = this.props.books;
        if(isEmpty(books)){
            return <Loading />;
        }

        const bookName = [];
        // initialized
        for(let i = 0 ; i < books.length ; i++) {
            bookName[i] = new Array(2);
            for(let j = 0 ; j < 2 ; j++) {
                bookName[i][j] = new Array(17);
            }
        }
        
        //どうにか直したい・・・汚すぎる。まず３次元配列を使ってる時点で汚い
        //脳筋プログラムができてしまったので助けてええええ
        for(let allBooks = books.length, bookIndex = 0 ; 0 < allBooks ; allBooks--, bookIndex++) {
            for(let newLine = 0 ; newLine < 2; newLine++) {
                for(let charNum = 0 ; charNum < 17; charNum++) {
                    //１行目かつ該当の文字が存在すればbooks.nameのbookIndex番目のcharNum番目の1文字を3次元配列のbookNameに挿入する
                    if(newLine == 0 && books[bookIndex].name.charAt(charNum) != "") {
                        bookName[bookIndex][newLine][charNum] = books[bookIndex].name.charAt(charNum);
                    //1行目かつ該当の文字が存在しなかったら表示がおかしくなるので2行目に空白を入れてfor文を抜ける
                    } else if(newLine == 0 && books[bookIndex].name.charAt(charNum) == "") {
                        bookName[bookIndex][newLine+1][charNum] = " ";
                        break;
                    //２行目かつ該当の文字が存在すれば
                    } else if(newLine == 1 && books[bookIndex].name.charAt(charNum+17) != "") {
                        //2行目の処理
                        if(newLine == 1 && charNum != 14) {
                            bookName[bookIndex][newLine][charNum] = books[bookIndex].name.charAt(charNum+17);
                        //2行目かつ14行目なら「...」を入れてfor文から抜ける
                        } else if(newLine == 1 && charNum == 14) {
                            bookName[bookIndex][newLine][charNum] = "...";
                            break;
                        //それ以外なら１文字をbookNameに挿入
                        } else {
                            bookName[bookIndex][newLine][charNum] = books[bookIndex].name.charAt(charNum+17);
                        }
                    }
                }
            }
        }

        const booksInfo = books.map((book, index) => {
            return (
                <div className="d-inline-block" key={index}>
                    <img hspace="50" src={book.cover}/>
                    <pre>{bookName[index][0]}</pre>
                    <pre>{bookName[index][1]}</pre>
                    <br/>
                </div>
            );
        });

        const bookList = [];
        for(let index = 0, key = booksInfo.length ; index < booksInfo.length; index++){
            bookList.push(booksInfo[index]);
            if(index % 3 == 2 || booksInfo.length == (index+1)){
                bookList.push(<div key={key++}></div>);
            }
        }

        return(
            <div>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <Search />
                            <ConnectedGenres />
                            <br/>
                            {bookList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
