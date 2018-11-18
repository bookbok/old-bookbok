import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
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
                    <a class="nav-item nav-link" href="/">ホーム <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/signup">新規登録</a>
                    <a class="nav-item nav-link" href="/login">ログイン</a>
                    <a class="nav-item nav-link" href="/mypage">マイページ</a>
                    <a class="nav-item nav-link" href="/books">本一覧</a>
                    <a class="nav-item nav-link" href="/books/0">本詳細</a>
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
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/signup" component={ SignUp } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/mypage" component={ Mypage } />
                <Route exact path="/books" component={ BookListView } />
                <Route exact path="/books/:id" component={ BookDetailView } />
                <Route exact component={ Home } /> {/* TODO: Replace to 404 page component*/}
            </Switch>
        </div>
    </BrowserRouter>
)

