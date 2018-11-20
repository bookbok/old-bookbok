import React, { Component } from 'react';
import { requestLogin } from "../actions.js";
import { store } from "../index";

//ログイン画面を表すコンポーネントを定義
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", remember: false };

        this.submitLogin = this.submitLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]: value,
        });
    }

    submitLogin(e) {
        e.preventDefault();
        console.log(this.state); // TODO: 消す
        //store.dispatch(requestLogin(this.state));
    }

    render() {
        return (
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">

                        <div class="card">
                            <div class="card-header">ログイン</div>

                            <div class="card-body">
                                <form onSubmit={this.submitLogin}>
                                    <div class="form-group row">
                                        <label htmlFor="email" class="col-sm-4 col-form-label text-md-right">Eメール</label>
                                        <div class="col-md-6">
                                            <input id="email"
                                                name="email"
                                                type="email"
                                                class="form-control"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                required
                                                autoFocus />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label htmlFor="password" class="col-md-4 col-form-label text-md-right">パスワード</label>
                                        <div class="col-md-6">
                                            <input id="password"
                                                name="password"
                                                type="password"
                                                class="form-control"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-md-6 offset-md-4">
                                            <div class="form-check">
                                                <input id="remember"
                                                    name="remember"
                                                    type="checkbox"
                                                    class="form-check-input"
                                                    checked={this.state.remmber}
                                                    onChange={this.handleChange} />
                                                <label class="form-check-label" htmlFor="remember">
                                                    ログイン状態を保持する
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row d-flex flex-column align-items-center">
                                        <button type="submit" class="btn btn-primary">
                                            ログイン
                                        </button>

                                        <a class="btn btn-link" href="#">
                                            パスワードを忘れましたか?
                                        </a>
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
