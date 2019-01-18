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
        console.log(e.target)
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    handleSubmit(e) {
        store.dispatch(requestUpdateUser(this.state));
    }

    render() {
        const user = this.props.user;
        if(utils.isEmpty(user)){
            return <Loading />;
        }

        return (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isTop userId={this.props.match.params.id} />
                            <div className="mt-4 user-detail-wrapper">
                                <div className="h1">
                                    <input name="name"
                                        type="text"
                                        className="name-input"
                                        value={this.state.name}
                                        onChange={this.handleChange} />
                                </div>
                                <p className="text-muted">{utils.makeDateJP(user.created_at)}に登録された読書家です</p>
                                <div className="mt-4">
                                    <strong>プロフィール画像</strong>
                                    <img src={this.state.avatar} className="user-info-avatar d-block mb-1" />
                                    <input name="avatar"
                                        type="text"
                                        className="avatar-input"
                                        value={this.state.avatar}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="mt-4">
                                    <strong>自己紹介</strong>
                                    <textarea name="description"
                                        type="text"
                                        className="description-input"
                                        value={this.state.description}
                                        onChange={this.handleChange} />
                                </div>

                                <button className="btn btn-success float-right" onClick={this.handleSubmit}>保存</button>
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
