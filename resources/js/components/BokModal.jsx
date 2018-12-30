import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { setBokToUserBook, registerBok } from "../actions";
import { getAuthUser, isEmpty } from '../utils';
import { withRouter } from "react-router-dom";
import { store } from "../store";

class BokModal_ extends Component {
    constructor(props) {
        super(props);

        this.state = { body: "", isInvalid: false, invalidMessage: "" };

        this.handleChangeBok = this.handleChangeBok.bind(this);
        this.handleRegisterBok = this.handleRegisterBok.bind(this);
    }

    handleChangeBok(e) {
        this.setState({ body: e.target.value });
    }

    handleRegisterBok(e) {
        e.preventDefault();

        const user = getAuthUser();
        if(isEmpty(user)){
            return this.props.history.push('/login');
        }

        const userBookId = this.props.match.params.userBookId;
        const bok = {
            'page_num_begin': this.state.page_num_begin,
            'page_num_end': this.state.page_num_end,
            'line_num': this.state.line_num,
            'body': this.state.body,
        };
        registerBok(userBookId, bok).then(res => {
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
            //store.dispatch(setBokToUserBook(json));
            $('#BokModalCenter').modal('hide'); // レビュー投稿時、モーダルを閉じる
        }).catch(()=>{});
    }

    component() {
        $('#ReviewModalCenter').modal('hide'); // 画面遷移時、もーダルを閉じる
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#BokModalCenter">
                    BOKボタン
                </button>

                <div className="modal fade" id="BokModalCenter" tabIndex="-1" role="dialog" aria-labelledby="BokModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">タイトル</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="閉じる">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="開始ページ" />
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="終了ページ" />
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="該当行番号" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="impressions-text" className="control-label">感想&nbsp;
                                                <span className="badge badge-danger">必須</span>
                                        </label>
                                        <textarea className="form-control" id="impressions-text" required></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                <button type="submit" className="btn btn-primary">BOKを投稿</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export const BokModal = withRouter(BokModal_);
