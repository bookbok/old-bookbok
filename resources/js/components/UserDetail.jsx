import React, { Component } from 'react';
import { connect } from "react-redux";
import { store } from "../store";
import { fetchUser } from "../actions";
import { isEmpty } from "../utils";

import { Loading } from "./shared/Loading";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

//マイページ画面を表すコンポーネントを定義
export class UserDetail extends Component {
    componentDidMount() {
        store.dispatch(fetchUser(this.props.match.params.id));
    }
    render() {
        const user = this.props.user;
        if(isEmpty(user)){
            return <Loading />;
        }

        return (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isTop userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <h1>トップ</h1>
                            </div>
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
