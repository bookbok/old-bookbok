import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { reviewRegister } from "../actions";

export class ReviewModal extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", body: "",isInvalid: false };

        this.handleChangeReview = this.handleChangeReview.bind(this);
        this.handleRegisterReview = this.handleRegisterReview.bind(this);
    }

    handleChangeReview(e) {
        this.setState({ value: e.target.value });
    }

    handleRegisterReview(e) {
        e.preventDefault();

        reviewRegister(1,this.state.body).then(res => {
            return res.json();
        }).then(res =>{
            this.props.history.push(`/users/${res.user.id}/user_books/${res.id}`);
        }).catch(err => {
            this.setState({ isInvalid: true });
            console.log("error!");
        });
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ReviewModalCenter">
                    レビューを投稿する
                </button>

                <div className="modal fade" id="ReviewModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ReviewModalCenterTitle" aria-hidden="true">
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
                                                value={this.state.name}
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
                                            value={this.state.name}
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
