import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home.jsx';
import { SignUp } from './SignUp.jsx';
import { Login } from './Login.jsx';
import { Logout } from './Logout.jsx';
import { UserRegister } from './UserRegister.jsx';
import { ConnectedUserDetail } from './UserDetail.jsx';
import { ConnectedBokFlow } from '../containers.js';
import { ConnectedBookDetail} from '../containers.js';
import { ConnectedBookList} from '../containers.js';
import { ConnectedUserBookshelf } from '../containers.js';
import { ConnectedLikeBokList } from '../containers.js';
import { ConnectedUserInfo } from '../containers.js';
import { ConnectedUserBookDetail } from '../containers.js';

// bootstrap global navigation bar
const Header = () => (
    <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="#">BookBok</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">ホーム <span className="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link" to="/bok_flow">ボックフロー</Link>
                    <Link className="nav-item nav-link" to="/signup">新規登録</Link>
                    <Link className="nav-item nav-link" to="/login">ログイン</Link>
                    <Link className="nav-item nav-link" to="/logout">ログアウト</Link>
                    <Link className="nav-item nav-link" to="/books">本一覧</Link>
                    <Link className="nav-item nav-link" to="/users">ユーザー一覧</Link>
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
                <Route exact path="/bok_flow" component={ ConnectedBokFlow } />
                <Route exact path="/signup" component={ SignUp } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/user_register" component={ UserRegister } />
                <Route exact path="/users/:id" component={ ConnectedUserDetail } />
                <Route exact path="/books" component={ ConnectedBookList } />
                <Route exact path="/books/:id" component={ ConnectedBookDetail } />
                <Route exact path="/users/:id/user_books" component={ ConnectedUserBookshelf } />
                <Route exact path="/users/:userId/user_books/:userBookId" component={ ConnectedUserBookDetail } />
                <Route exact path="/users/:id/likes" component={ ConnectedLikeBokList } />
                <Route exact path="/users" component={ ConnectedUserInfo } />
                <Route exact component={ Home } /> {/* TODO: Replace to 404 page component*/}
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)

