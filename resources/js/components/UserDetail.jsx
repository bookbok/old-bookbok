import React, { Component } from 'react';
import { store } from "../store";
import { fetchUser, requestUpdateUser } from "../actions";
import * as utils from "../utils";

import { Loading } from "./shared/Loading";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

//マイページ画面を表すコンポーネントを定義
class UserDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            avatar: "",
            description: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        store.dispatch(fetchUser(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        // 更新後のユーザー情報を全てstateにも反映
        if(!nextProps.user) return;
        const { name, avatar, description } = nextProps.user;
        this.setState({ name, avatar, description, });
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    handleSubmit(e) {
        store.dispatch(requestUpdateUser(this.state));
    }

    renderNameRow(me, name, changeHandler) {
        if(me) {
            return <input name="name"
                type="text"
                className="name-input"
                value={name}
                onChange={changeHandler} />;
        }
        return name;
    }

    renderUserEditRow(me, state, changeHandler, submitHandler) {
        if(!me) {
            return null;
        }
        return (
            <div>
                <div className="mt-4">
                    <strong>プロフィール画像</strong>
                    <img src={state.avatar} className="user-info-avatar d-block mb-1" />
                    <input name="avatar"
                        type="text"
                        className="avatar-input"
                        value={state.avatar}
                        onChange={changeHandler} />
                </div>

                <div className="mt-4">
                    <strong>自己紹介</strong>
                    <textarea name="description"
                        type="text"
                        className="description-input"
                        value={state.description}
                        onChange={changeHandler} />
                </div>

                <button className="btn btn-success float-right"
                    onClick={submitHandler}>
                    保存
                </button>
            </div>
        );
    }

    render() {
        const user = this.props.user;
        if(utils.isEmpty(user)){
            return <Loading />;
        }

        const currentUser = utils.getAuthUser();
        const me = (currentUser && currentUser.id === user.id);
        return (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isTop userId={this.props.match.params.id} />
                            <div className="mt-4 user-detail-wrapper">
                                <div className="h1">
                                    {this.renderNameRow(me, this.state.name, this.handleChange)}
                                </div>
                                <p className="text-muted">{utils.makeDateJP(user.created_at)}に登録された読書家です</p>
                                {this.renderUserEditRow(me, this.state, this.handleChange, this.handleSubmit)}
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
    fetchOnIdUpdateDecorator((nextUserId) => {
        store.dispatch(fetchUser(nextUserId));
    })(
        UserDetail
    )
);
