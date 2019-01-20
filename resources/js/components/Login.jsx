import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { requestLogin } from "../actions.js";
import { store } from "../store";
import { Link } from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", remember: false };

        this.submitLogin = this.submitLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // 変更されたinput要素のnameを取得し、自動的にstateの値を変更するハンドラ
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]: value,
        });
    }

    submitLogin(e) {
        e.preventDefault();
        requestLogin(this.state).then(() => {
            this.props.history.push('/bok_flow'); // ログイン後のデフォルト遷移先
        });
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        <div className="card">
                            <div className="card-header">ログイン</div>

                            <div className="card-body">
                                <form onSubmit={this.submitLogin}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-4 col-form-label text-md-right">Eメール</label>
                                        <div className="col-md-6">
                                            <input id="email"
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                required
                                                autoFocus />
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
                                        <div className="col-md-6 offset-md-4">
                                            <div className="form-check">
                                                <input id="remember"
                                                    name="remember"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={this.state.remmber}
                                                    onChange={this.handleChange} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    ログイン状態を保持する
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row d-flex flex-column align-items-center">
                                        <button type="submit" className="btn btn-primary">
                                            ログイン
                                        </button>

                                        <Link to="#" className="btn btn-link">
                                            パスワードを忘れましたか?
                                        </Link>
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
