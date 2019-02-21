import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { store } from "../../store";
import { successfulStatus, getAuthUser, getQueryParam } from '../../utils';

import { Loading } from '../shared/Loading';
import { verifyEmail, resendVerifyMail, setAlertMessage } from '../../actions';


class EmailVerify extends React.Component {
    constructor(props) {
        super(props);

        this.state = { verified: false, email: '', show: false };
        this.handleClickResend = this.handleClickResend.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const url = getQueryParam('url', location.href);
        verifyEmail(url).then(json => {
            if(successfulStatus(json.status) || !json.status) {
                store.dispatch(setAlertMessage("success", {__html: json.userMessage}));
                this.props.history.push('/login');
            } else {
                store.dispatch(setAlertMessage("warning", {__html: json.userMessage}));
                this.setState({ verified: true });
            }
        });
    }

    handleClickResend(email) {
        let destinationEmail = null;
        const currentUser = getAuthUser();
        if(currentUser) {
            destinationEmail = currentUser.email;
        } else if(email) {
            destinationEmail = email;
        } else {
            this.setState({ show: true });
            return;
        }

        resendVerifyMail(destinationEmail).then(json => {
            // HACK: 200系で帰るときだけstatusが設定されていない場合が多々あるためこのような記法になっている
            if(successfulStatus(json.status) || !json.status) {
                store.dispatch(setAlertMessage("success", {__html: json.userMessage}));
            } else {
                store.dispatch(setAlertMessage("warning", {__html: json.userMessage}));
            }
        });
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    render() {
        if(this.state.verified === false) {
            return <Loading />;
        }

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        <div className="card">
                            <div className="card-header">メールアドレスを検証してください</div>

                            <div className="card-body">
                                もし検証メールを確認していない場合、メールが届いていないかご確認ください。<br/>
                                もう一度メールを送信する場合は

                                <div className="dropdown">
                                    <a role="button"
                                        className="text-primary"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        onClick={() => this.handleClickResend()} >
                                        こちらをクリックしてください。
                                    </a>

                                    <div className={`dropdown-menu p-4 ${this.state.show ? 'show': ''}`}>
                                        <div className="form-group">
                                            <label htmlFor="email">送信先email</label>
                                            <input name="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="email@example.com"
                                                value={this.state.email}
                                                onChange={this.handleChange} />
                                        </div>
                                        <button className="btn btn-success"
                                            onClick={() => this.handleClickResend(this.state.email)}>
                                            送信
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>{/* end card */}

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EmailVerify);
