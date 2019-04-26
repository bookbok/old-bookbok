import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export class MyPageTabs extends Component {
    render() {
        const userId = this.props.userId;

        return (
            <div className="nav-scroll">
                {/*タブのボタン部分*/}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link
                            to={`/users/${userId}/`}
                            className={
                                this.props.isTop
                                    ? 'nav-link active tab-border'
                                    : 'nav-link text-secondary'
                            }
                            data-toggle={this.props.isTop ? 'tab' : ''}
                        >
                            トップ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={`/users/${userId}/user_books`}
                            className={
                                this.props.isUserBooks
                                    ? 'nav-link active tab-border'
                                    : 'nav-link text-secondary'
                            }
                            data-toggle={this.props.isUserBooks ? 'tab' : ''}
                        >
                            本棚
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to={`/users/${userId}/likes`}
                            className={
                                this.props.isLikes
                                    ? 'nav-link active tab-border'
                                    : 'nav-link text-secondary'
                            }
                            data-toggle={this.props.isLikes ? 'tab' : ''}
                        >
                            いいね
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={`/users/${userId}/loves`}
                            className={
                                this.props.isLoves
                                    ? 'nav-link active tab-border'
                                    : 'nav-link text-secondary'
                            }
                            data-toggle={this.props.isLoves ? 'tab' : ''}
                        >
                            ブックマーク
                        </Link>
                    </li>

                    <li className="nav-item tab-follow-wrapper">
                        <Link
                            to={`/users/${userId}/followings`}
                            className={
                                this.props.isFollowings
                                    ? 'nav-link active tab-border'
                                    : 'nav-link text-secondary'
                            }
                            data-toggle={this.props.isFollowings ? 'tab' : ''}
                        >
                            フォロー中
                        </Link>
                    </li>
                    <li className="nav-item tab-follow-wrapper">
                        <Link
                            to={`/users/${userId}/followers`}
                            className={
                                this.props.isFollowers
                                    ? 'nav-link active tab-border'
                                    : 'nav-link text-secondary'
                            }
                            data-toggle={this.props.isFollowers ? 'tab' : ''}
                        >
                            フォロワー
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

MyPageTabs.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isTop: PropTypes.bool.isRequired,
    isUserBooks: PropTypes.bool.isRequired,
    isLikes: PropTypes.bool.isRequired,
    isLoves: PropTypes.bool.isRequired,
    isFollowers: PropTypes.bool.isRequired,
    isFollowings: PropTypes.bool.isRequired,
};
