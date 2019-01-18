import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { directUserRegister } from "../actions.js";

export class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                          name: { value: "", invalidName: "", isInvalidName: false},
                          email: { value: "", invalidEmail: "", isInvalidEmail: false},
                          password: { value: "", invalidPassword: "", isInvalidPassword: false},
                          passwordConfirm: "",
                          isInvalid: false
                        };

        this.submitRegister = this.submitRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // 変更されたinput要素のnameを取得し、自動的にstateの値を変更するハンドラ
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'passwordConfirm') {
            return this.setState({ [name]: value });
        }
        this.setState((state) => {
            return {
                [name]: {
                    ...state[name],
                    value: value,
                }
            }
        });
    }

    submitRegister(e) {
        e.preventDefault();
        const that = this;
        directUserRegister(this.state).then(res => {
            if(res.status === 400){
                res.json().then(json => {
                    if(json.userMessage.name != null){
                        this.setState({name: {invalidName: json.userMessage.name,isInvalidName: true}});
                    }
                    if(json.userMessage.email != null){
                        this.setState({email: {invalidEmail: json.userMessage.email, isInvalidEmail: true}});
                    }
                    if(json.userMessage.password != null){
                        this.setState({password: {invalidPassword: json.userMessage.password, isInvalidPassword: true}});
                    }
                    this.setState({ isInvalid: true });
                });
                throw new Error();
            }
            return res.json();
        }).then(json => {
            this.props.history.push('/login');
        }).catch(()=>{});
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">アカウント登録</div>

                            <div className="card-body">
                                <div className={`mb-4 text-size invalid-feedback text-center ${this.state.isInvalid && "d-block"}`}>
                                    入力内容をもう一度ご確認ください。
                                </div>
                                <form onSubmit={this.submitRegister}>
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">名前</label>

                                        <div className="col-md-6">
                                            <input id="name"
                                                name="name"
                                                type="text"
                                                className={`form-control ${this.state.name.isInvalidName && "is-invalid"}`}
                                                value={this.state.name.value || ''}
                                                onChange={this.handleChange}
                                                required
                                                autoFocus />
                                            <div className="invalid-feedback">
                                                {this.state.name.invalidName}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Eメール</label>
                                        <div className="col-md-6">
                                            <input id="email"
                                                name="email"
                                                type="email"
                                                className={`form-control ${this.state.email.isInvalidEmail && "is-invalid"}`}
                                                value={this.state.email.value || ''}
                                                onChange={this.handleChange}
                                                required />
                                            <div className="invalid-feedback">
                                                 {this.state.email.invalidEmail}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">パスワード</label>
                                        <div className="col-md-6">
                                            <input id="password"
                                                name="password"
                                                type="password"
                                                className={`form-control ${this.state.password.isInvalidPassword && "is-invalid"}`} 
                                                value={this.state.password.value || ''}
                                                onChange={this.handleChange}
                                                required />
                                            <div className="invalid-feedback">
                                                {this.state.password.invalidPassword}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">確認用パスワード</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm"
                                                name="passwordConfirm"
                                                type="password"
                                                className="form-control"
                                                value={this.state.passwordConfirm || ''}
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

