import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Home, SignUp, Login, Mypage } from './Screen.jsx';

//ヘッダー(globalnavigation）
const Header = () => (
    <div>
        {/*bootstrapナビゲーションバーの設定*/}
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <a class="navbar-brand"　href="#">BookBok</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/home">ホーム <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/signup">新規登録</a>
                    <a class="nav-item nav-link" href="/login">ログイン</a>
                    <a class="nav-item nav-link" href="/mypage">マイページ</a>
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
        </div>
    </BrowserRouter>
)

