import React, { Component } from 'react';
import { connect } from "react-redux";

import { ConnectedUserInfo } from "../containers.js";
import { MyPageTabs } from "./shared/user/MyPageTabs";

//マイページ画面を表すコンポーネントを定義
export class UserDetail extends Component {
    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <MyPageTabs isTop userId={this.props.match.params.id} />
                        <div className="mt-4">
                            <h1>トップ</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const ConnectedUserDetail = connect(
    state => state,
)(UserDetail);
