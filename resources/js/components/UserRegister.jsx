import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { directUserRegister } from "../actions.js";
import { store } from "../store";
import { successfulStatus } from "../utils";
import { Loading } from "./shared/Loading";

export class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", email: "", password: "", passwordConfirm: "", invalid: false };

        this.submitRegister = this.submitRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // 変更されたinput要素のnameを取得し、自動的にstateの値を変更するハンドラ
    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });
    }

    submitRegister(e) {
        e.preventDefault();
        const req=store.dispatch(directUserRegister(this.state));
        let that = this;
        req.then(function(value) {
            if(value==undefined) {
                that.props.history.push('/login');
            } else {
                that.setState({ invalid: true });
            }
        });
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">アカウント登録</div>

                            <div className="card-body">
                                <div className={`text-size invalid-feedback text-center ${this.state.invalid && "d-block"}`}>
                                    入力内容をご確認ください。 
                                </div>
                                {this.state.invalid && <br/>}
                                <form onSubmit={this.submitRegister}>
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">名前</label>

                                        <div className="col-md-6">
                                            <input id="name"
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                                required
                                                autoFocus />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Eメール</label>

                                        <div className="col-md-6">
                                            <input id="email"
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">パスワード</label>

                                        <div className="col-md-6">
                                            <input id="password"
                                                name="password"
                                                type="password"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                required />

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">確認用パスワード</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm"
                                                name="passwordConfirm"
                                                type="password"
                                                className="form-control"
                                                value={this.state.passwordConfirm}
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                    </div>

                                    <div className="form-group row d-flex flex-column align-items-center">
                                        <button type="submit" className="btn btn-primary">登録</button>
                                    </div>
                                </form>
                            </div>
                        </div>{/* end card */}

                    </div>
                </div>
            </div>
        );
    }
}

