import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { setReview, reviewRegister } from "../../actions";
import { getAuthUser, isEmpty } from '../../utils';
import { store } from "../../store";

class ReviewModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: this.props.review.body,
            isInvalid: false,
            invalidMessage: ""
        };

        this.handleChangeReview = this.handleChangeReview.bind(this);
        this.handleRegisterReview = this.handleRegisterReview.bind(this);
    }

    handleChangeReview(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });
    }

    handleRegisterReview(e) {
        e.preventDefault();

        const user = getAuthUser();
        if(isEmpty(user)){
            return this.props.history.push('/login');
        }

        const userBookId = this.props.match.params.userBookId;
        const review = {
            'title': this.state.title,
            'body': this.state.body
        };
        reviewRegister(userBookId, review).then(res => {
            if(res.status === 401) {
                this.setState({ isInvalid: true, invalidMessage: 'ログインが必要です' });
                throw new Error();
            }else if(!res.ok){
                res.json().then(json => {
                    this.setState({ isInvalid: true, invalidMessage: json.userMessage });
                });
                throw new Error();
            }
            return res.json();
        }).then(res => {
            store.dispatch(setReview(res));
            $('#ReviewModalCenter').modal('hide'); // レビュー投稿時、モーダルを閉じる
        }).catch(()=>{});
    }

    componentWillUnmount() {
        $('#ReviewModalCenter').modal('hide');
    }


    render() {
        if(this.props.isModalView === false){
            return null;
        }
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ReviewModalCenter">
                    レビューを投稿する
                </button>

                <div className="modal fade" id="ReviewModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ReviewModalCenterTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="閉じる">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={this.handleRegisterReview}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col">レビューのタイトルを記入してください
                                            <input id="title"
                                                name="title"
                                                type="text"
                                                className="form-control"
                                                value={this.state.title}
                                                onChange={this.handleChangeReview}
                                                placeholder="この本をズバリ一言で！" />
                                        </div>
                                    </div>
                                    <div className="form-group" className="mt-5">
                                        <label htmlFor="impressions-text" className="control-label">ここにレビューを記入してください&nbsp;
                                            <span className="badge badge-danger">必須</span>
                                        </label>
                                        <textarea id="impressions-text"
                                            name="body"
                                            className="form-control"
                                            rows="10"
                                            value={this.state.body}
                                            onChange={this.handleChangeReview}
                                            placeholder="1冊を読み終えてどうだったか。これから読む人に伝えたいこと。"
                                            required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                    <button type="submit" className="btn btn-primary">レビューを投稿</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReviewModal);
