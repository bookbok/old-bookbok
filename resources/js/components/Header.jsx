import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home.jsx';
import { SignUp } from './SignUp.jsx';
import { Login } from './Login.jsx';
import { Logout } from './Logout.jsx';
import { Mypage } from './Mypage.jsx';
import { BookListView } from './BookListView.jsx';
import { ConnectedBookDetail} from '../containers.js';


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
                    <Link className="nav-item nav-link" to="/">ホーム <span class="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link" to="/signup">新規登録</Link>
                    <Link className="nav-item nav-link" to="/login">ログイン</Link>
                    <Link className="nav-item nav-link" to="/mypage">マイページ</Link>
                    <Link className="nav-item nav-link" to="/books">本一覧</Link>
                    <Link className="nav-item nav-link" to="/books/0">本詳細</Link>
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
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/mypage" component={ Mypage } />
                <Route exact path="/books" component={ BookListView } />
                <Route exact path="/books/:id" component={ ConnectedBookDetail } />
                <Route exact component={ Home } /> {/* TODO: Replace to 404 page component*/}
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)

