import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// bootstrap global navigation bar
class Header extends Component {
    render() {
        const loggedinUser = this.props.loggedinUser;

        function AuthNavItemsInNavRight() {
            if (loggedinUser) {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a
                                id="navbarDropdown"
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span>{loggedinUser.name}</span> <span className="caret" />
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to={`/users/${loggedinUser.id}`}>
                                    プロフィール
                                </Link>
                                <Link className="dropdown-item" to={'/bulk_regist'}>
                                    本棚の一括登録
                                </Link>
                                <Link className="dropdown-item" to="/settings/profile">
                                    設定
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
                            <Link className="nav-link" to="/login">
                                ログイン
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                新規登録
                            </Link>
                        </li>
                    </ul>
                );
            }
        }

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-bookbok">
                    <Link className="navbar-brand" to="/">
                        <img src="/images/book-fff.svg" width="16" height="16" className="mr-1" />
                        <p className="d-inline align-middle">BookBok</p>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {/* Left side of Navbar */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    ホーム <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bok_flow">
                                    Bokフロー
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/books">
                                    本の一覧
                                </Link>
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

Header.propTypes = {
    loggedinUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default connect(state => ({ loggedinUser: state.loggedinUser }))(Header);
