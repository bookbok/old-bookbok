import React, { Component } from 'react';
import { connect } from "react-redux";
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

    // 更新後のユーザー情報を全てstateにも反映
    componentWillReceiveProps(nextProps) {
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

    renderAvatarRow(me, avatar, changeHandler) {
        if(me) {
            return <input name="avatar"
                type="text"
                className="avatar-input"
                value={avatar}
                onChange={changeHandler} />;
        }
        return null;
    }

    renderDescriptionRow(me, description, changeHandler) {
        if(me) {
            return <textarea name="description"
                type="text"
                className="description-input"
                value={description}
                onChange={changeHandler} />;
        }
        return <p className="description-input">{description || '未設定'}</p>;
    }

    render() {
        const user = this.props.user;
        if(utils.isEmpty(user)){
            return <Loading />;
        }

        const me = utils.getAuthUser().id === user.id;
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
                                <div className="mt-4">
                                    <strong>プロフィール画像</strong>
                                    <img src={this.state.avatar} className="user-info-avatar d-block mb-1" />
                                    {this.renderAvatarRow(me, this.state.avatar, this.handleChange)}
                                </div>

                                <div className="mt-4">
                                    <strong>自己紹介</strong>
                                    {this.renderDescriptionRow(me, this.state.description, this.handleChange)}
                                </div>

                                {me ? <button className="btn btn-success float-right"
                                        onClick={this.handleSubmit}>
                                        保存
                                    </button> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state,
)(UserDetail);
