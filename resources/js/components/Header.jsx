import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Home } from './Home.jsx';
import { SignUp } from './SignUp.jsx';
import { Login } from './Login.jsx';
import { Mypage } from './Mypage.jsx';
import { BookDetailView } from './BookDetailView.jsx';
import { BookListView } from './BookListView.jsx';


// bootstrap global navigation bar
const Header = () => (
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <a class="navbar-brand" href="#">BookBok</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/home">ホーム <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/signup">新規登録</a>
                    <a class="nav-item nav-link" href="/login">ログイン</a>
                    <a class="nav-item nav-link" href="/mypage">マイページ</a>
                    <a class="nav-item nav-link" href="/booklist">本一覧</a>
                    <a class="nav-item nav-link" href="/bookdetailview">本詳細</a>
                </div>
            </div>
        </nav>
    </div>
)

//react-router-dom
export const MenuRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Route exact path="/"  />
            <Route path="/home" component={ Home } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/login" component={ Login } />
            <Route path="/mypage" component={ Mypage } />
            <Route path="/booklist" component={ BookListView } />
            <Route path="/bookdetailview" component={ BookDetailView } />
        </div>
    </BrowserRouter>
)

