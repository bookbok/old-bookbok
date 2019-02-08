import React, { Component } from 'react';
import { store } from "../store";
import { fetchUser, requestUpdateUser, loading, loaded } from "../actions";
import * as utils from "../utils";
import { Loading } from "./shared/Loading";

class Config extends Component {
    constructor(props) {
        super(props);

        const userInfo = utils.getAuthUser();
        console.table(userInfo);

        this.state = {
            name: "",
            avatar: "",
            description: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const loginUser = utils.getAuthUser();
        if(!loginUser){
            return this.props.history.push("/login");
        }
        console.table(loginUser);
        this.setState({
            name: loginUser.name,
            avatar: loginUser.avatar,
            description: loginUser.description
        });
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
        return this.props.history.push(`/user/getAuthUser().id/`);
    }

    render() {
        return (
            <div className="page-content-wrap row">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <div className="user-detail-wrapper d-flex flex-column">
                                <h1>プロフィール設定</h1>

                                {/* ニックネーム */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <p className="font-weight-bold m-0">ニックネーム</p>
                                        <p className="text-muted hint-message">32文字以内の英数字で入力してください</p>
                                    </div>
                                    <input name="name"
                                        type="text"
                                        className="name-input"
                                        value={this.state.name}
                                        onChange={this.handleChange} />
                                </div>

                                {/* プロフィール画像 */}
                                <div className="items-wrapper">
                                    <p className="font-weight-bold m-0">プロフィール画像</p>
                                    <img src={this.state.avatar} className="user-info-avatar d-block mb-1" />
                                    <input name="avatar"
                                        type="text"
                                        className="avatar-input"
                                        placeholder="例：https://example.com/sample.png"
                                        value={this.state.avatar}
                                        onChange={this.handleChange} />
                                </div>

                                {/* 自己紹介欄 */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <p className="font-weight-bold m-0">自己紹介</p>
                                        <p className="text-muted hint-message">1000文字以内で入力してください</p>
                                    </div>
                                    <textarea name="description"
                                        type="text"
                                        className="description-input"
                                        placeholder="例）小説をよく読みます。好きな作者は○○さんです。"
                                        value={this.state.description}
                                        onChange={this.handleChange} />
                                </div>

                                <button className="btn btn-success float-right"
                                    onClick={this.handleSubmit}>
                                    保存
                                </button>
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
    Config
);
