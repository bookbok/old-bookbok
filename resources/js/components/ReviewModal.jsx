import React, { Component } from "react";
import ReactDOM from 'react-dom';

export class ReviewModal extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", body: "" };

        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
    }

    //変更されたinput要素のnameを取得し、自動的にstateの値を変更するハンドラ
    handleChange(e) {
        this.setState({ value: event.target.value });
    }

    submitRegister(e) {
        e.preventDefault();

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
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col">レビューのタイトルを記入してください
                                            <input id="title"
                                                name="title"
                                                type="text"
                                                className="form-control"
                                                value={this.state.name}
                                                onChange={this.handleChange}
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
                                            onChange={this.handleChange}
                                            placeholder="1冊を読み終えてどうだったか。これから読む人に伝えたいこと。"
                                            required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                <button type="submit" className="btn btn-primary">レビューを投稿</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
