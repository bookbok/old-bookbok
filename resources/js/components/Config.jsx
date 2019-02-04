import React, { Component } from 'react';
import { store } from "../store";
import { fetchUser, requestUpdateUser, loading, loaded } from "../actions";
import * as utils from "../utils";
import { Loading } from "./shared/Loading";

class Config extends Component {
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
        if(!utils.getAuthUser()){ return this.props.history.push("/login"); }
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

    render() {
        return (
            <div className="page-content-wrap row">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <div className="mt-4 user-detail-wrapper">
                                <input name="name"
                                    type="text"
                                    className="name-input"
                                    value={name}
                                    onChange={this.handleChange} />;
                                <strong>プロフィール画像</strong>
                                <img src={this.state.avatar} className="user-info-avatar d-block mb-1" />
                                <input name="avatar"
                                    type="text"
                                    className="avatar-input"
                                    placeholder="https://example.com/sample.png"
                                    value={this.state.avatar}
                                    onChange={this.handleChange} />

                                <div className="mt-4">
                                    <strong>自己紹介</strong>
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
