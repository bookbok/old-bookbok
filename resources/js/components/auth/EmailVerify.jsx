import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { store } from "../../store";
import { successfulStatus } from '../../utils';

import { Loading } from '../shared/Loading';
import { verifyEmail, resendVerifyMail, setAlertMessage } from '../../actions';


class EmailVerify extends React.Component {
    constructor(props) {
        super(props);

        this.state = { verified: false };
        this.handleClickResend = this.handleClickResend.bind(this);
    }

    componentDidMount() {
        verifyEmail(location.href).then(json => {
            if(successfulStatus(json.status) || !json.status) {
                store.dispatch(setAlertMessage("success", {__html: json.userMessage}));
                this.props.history.push('/login');
            } else {
                store.dispatch(setAlertMessage("warning", {__html: json.userMessage}));
            }
            this.setState({ verified: true });
        });
    }

    handleClickResend() {
        resendVerifyMail().then(json => {
            // HACK: 200系で帰るときだけstatusが設定されていない場合が多々あるためこのような記法になっている
            if(successfulStatus(json.status) || !json.status) {
                store.dispatch(setAlertMessage("success", {__html: json.userMessage}));
            } else {
                store.dispatch(setAlertMessage("warning", {__html: json.userMessage}));
            }
        });
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
                                もう一度メールを送信する場合は<Link to="#" onClick={this.handleClickResend}>こちらをクリックしてください。</Link>
                            </div>
                        </div>{/* end card */}

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EmailVerify);
