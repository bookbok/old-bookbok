import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class MyPageTabs extends Component {
    render() {
        const userId = this.props.userId;

        return (
            <div>
                {/*タブのボタン部分*/}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to={`/users/${userId}/`}
                           className={this.props.isTop ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isTop ? 'tab' : ''}>トップ</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/users/${userId}/user_books`}
                           className={this.props.isUserBooks ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isUserBooks ? 'tab' : ''}>本棚</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/users/${userId}/likes`}
                           className={this.props.isLikes ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isLikes ? 'tab' : ''}>LIKE</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/users/${userId}/loves`}
                           className={this.props.isLoves ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isLoves ? 'tab' : ''}>LOVE</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

