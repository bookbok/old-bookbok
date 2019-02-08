import React, { Component } from 'react';
import { store } from "../store";
import { fetchUser, requestUpdateUser, loading, loaded } from "../actions";
import * as utils from "../utils";

import { Loading } from "./shared/Loading";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

const fetchUserDetailActions = (userId) => {
    store.dispatch(loading());
    Promise.all([
        fetchUser(userId),
    ]).then(() => {
        store.dispatch(loaded());
    });
}

//マイページ画面を表すコンポーネントを定義
class UserDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            avatar: "",
            description: "",
        };
    }

    componentDidMount() {
        fetchUserDetailActions(this.props.match.params.id);
    }

    render() {
        const user = this.props.user;
        if(this.props.loading || !user){
            return <Loading />;
        }

        const currentUser = utils.getAuthUser();

        return (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isTop userId={this.props.match.params.id} />
                            <div className="mt-4 user-detail-wrapper">
                                <div className="d-flex">
                                    <img src={currentUser.avatar} className="user-info-avatar d-block" />
                                    <h3 className="m-0 ml-2 d-flex align-items-center">{currentUser.description}</h3>
                                </div>
                                <p className="text-muted">{utils.makeDateJP(user.created_at)}に登録された読書家です</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


// URL内のid変更を検知して、再度ユーザー情報をfetchするためのデコレーター
import { connect } from "react-redux";
import { fetchOnIdUpdateDecorator } from '../decorators/FetchOnIdUpdateDecorator';

export default connect(state => state)(
    fetchOnIdUpdateDecorator(({id}) => {
        fetchUserDetailActions(id);
    })(
        UserDetail
    )
);
