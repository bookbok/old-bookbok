import React, { Component } from 'react';

export class MyPageTabs extends Component {
    render() {
        const userId = this.props.userId;

        return (
            <div>
                {/*タブのボタン部分*/}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href={`/users/${userId}/`}
                           className={this.props.isTop ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isTop ? 'tab' : ''}>トップ</a>
                    </li>
                    <li className="nav-item">
                        <a href={`/users/${userId}/user_books`}
                           className={this.props.isUserBooks ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isUserBooks ? 'tab' : ''}>本棚</a>
                    </li>
                    <li className="nav-item">
                        <a href={`/users/${userId}/likes`}
                           className={this.props.isLikes ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isLikes ? 'tab' : ''}>LIKE</a>
                    </li>
                    <li className="nav-item">
                        <a href={`/users/${userId}/loves`}
                           className={this.props.isLoves ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isLoves ? 'tab' : ''}>LOVE</a>
                    </li>
                </ul>
            </div>
        );
    }
}

