import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { Footer } from './Footer';
import { Home } from './Home.jsx';
import { Login } from './Login.jsx';
import { Logout } from './Logout.jsx';
import { PrivacyPolicyView } from './PrivacyPolicyView';
import { TermsOfServiceView } from './TermsOfServiceView';
import { UserRegister } from './UserRegister.jsx';

import { ConnectedFollowersView } from './FollowersView';
import { ConnectedFollowingsView } from './FollowingsView';

import { ConnectedUserDetail } from './UserDetail.jsx';
import { ConnectedBokFlow } from '../containers.js';
import { ConnectedBookDetail} from '../containers.js';
import { ConnectedBookList} from '../containers.js';
import { ConnectedUserBookshelf } from '../containers.js';
import { ConnectedLikeBokList } from '../containers.js';
import { ConnectedUsersView } from '../containers.js';
import { ConnectedUserBookDetail } from '../containers.js';

// bootstrap global navigation bar
class Header extends Component {
    render() {
        const loggedinUser = this.props.loggedinUser;

        function AuthNavItemsInNavRight() {
            if(loggedinUser) {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a id="navbarDropdown"
                               className="nav-link dropdown-toggle"
                               href="#"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false">
                                <span>{loggedinUser.name}</span> <span class="caret"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/users/${loggedinUser.id}`}>
                                    プロフィール
                                </Link>
                                <Link className="dropdown-item" to="/logout">
                                    ログアウト
                                </Link>
                            </div>
                        </li>
                    </ul>
                );
            } else {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">ログイン</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">新規登録</Link>
                        </li>
                    </ul>
                );
            }
        }

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <a className="navbar-brand" href="#">BookBok</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {/* Left side of Navbar */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">ホーム <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bok_flow">BokFlow</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/books">本一覧</Link>
                            </li>
                        </ul>

                        {/* Right side of Navbar */}
                        <AuthNavItemsInNavRight />
                    </div>
                </nav>
            </div>
        );
    }
}

const ConnectedHeader = connect(
    state => ({ loggedinUser: state.loggedinUser })
)(Header);


//react-router-dom
export const MenuRouter = () => (
    <BrowserRouter>
        <div>
            <ConnectedHeader />
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/privacy" component={ PrivacyPolicyView } />
                <Route exact path="/terms_of_service" component={ TermsOfServiceView } />
                <Route exact path="/bok_flow" component={ ConnectedBokFlow } />
                <Route exact path="/register" component={ UserRegister } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/user_register" component={ UserRegister } />
                <Route exact path="/users/:id" component={ ConnectedUserDetail } />
                <Route exact path="/books" component={ ConnectedBookList } />
                <Route exact path="/books/:id" component={ ConnectedBookDetail } />
                <Route exact path="/users/:id/user_books" component={ ConnectedUserBookshelf } />
                <Route exact path="/users/:userId/user_books/:userBookId" component={ ConnectedUserBookDetail } />

                <Route exact path="/users/:id/likes" component={ ConnectedLikeBokList } />
                <Route exact path="/users/:id/followers" component={ ConnectedFollowersView } />
                <Route exact path="/users/:id/followings" component={ ConnectedFollowingsView } />

                <Route exact path="/users" component={ ConnectedUsersView } />
                <Route exact component={ Home } /> {/* TODO: Replace to 404 page component*/}
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)

