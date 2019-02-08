import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { setBokToUserBook, registerBok } from "../../actions";
import { getAuthUser, isEmpty } from '../../utils';
import { store } from "../../store";
import { ErrorsView } from '../shared/ErrorsView';

class BokModal extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState();
        this.handleChangeBok = this.handleChangeBok.bind(this);
        this.handleRegisterBok = this.handleRegisterBok.bind(this);
    }

    initialState() {
        return {
            page_num_begin: "",
            page_num_end: "",
            line_num: "",
            body: "",
            isInvalid: false,
            invalidMessage: ""
        };
    }

    handleChangeBok(e) {
        const key = e.target.name;
        this.setState({ [key]: e.target.value });
    }

    handleRegisterBok(e) {
        e.preventDefault();

        const user = getAuthUser();
        if(isEmpty(user)){
            return this.props.history.push('/login');
        }

        const userBookId = this.props.match.params.userBookId;
        const bok = this.makeBok();
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
        }).then(json => {
            $('#BokModalCenter').modal('hide'); // レビュー投稿時、モーダルを閉じる
            store.dispatch(setBokToUserBook(json));
            this.setState(this.initialState());
        }).catch(()=>{});
    }

    // 入力必須ではない項目のデータ制御
    makeBok() {
        let bok = {
            'body': this.state.body
        };

        if(this.state.page_num_begin !== "") {
            bok = { ...bok, 'page_num_begin': this.state.page_num_begin };
        }
        if(this.state.page_num_end !== "") {
            bok = { ...bok, 'page_num_end': this.state.page_num_end };
        }
        if(this.state.line_num !== "") {
            bok = { ...bok, 'line_num': this.state.line_num };
        }
        return bok;
    }

    componentWillUnmount() {
        $('#BokModalCenter').modal('hide'); // 画面遷移時、モーダルを閉じる
    }

    render() {
        if(this.props.isModalView === false){
            return null;
        }
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#BokModalCenter">
                    Bok
                </button>

                <div className="modal fade" id="BokModalCenter" tabIndex="-1" role="dialog" aria-labelledby="BokModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Bokを追加します</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="閉じる">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={this.handleRegisterBok}>
                                <div className="modal-body">
                                    <ErrorsView errors={this.state.invalidMessage}/>

                                    <div className="form-row">
                                        <div className="col">
                                            <input name="page_num_begin"
                                                type="number"
                                                className="form-control"
                                                placeholder="開始ページ"
                                                value={this.state.page_num_begin}
                                                onChange={this.handleChangeBok} />
                                        </div>
                                        <div className="col">
                                            <input name="page_num_end"
                                                type="number"
                                                className="form-control"
                                                placeholder="終了ページ"
                                                value={this.state.page_num_end}
                                                onChange={this.handleChangeBok} />
                                        </div>
                                        <div className="col">
                                            <input name="line_num"
                                                type="number"
                                                className="form-control"
                                                placeholder="該当行番号"
                                                value={this.state.line_num}
                                                onChange={this.handleChangeBok} />
                                        </div>
                                    </div>

                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="impressions-text" className="control-label">感想&nbsp;
                                                <span className="badge badge-danger">必須</span>
                                        </label>
                                        <textarea id="impressions-text"
                                            name="body"
                                            className="form-control"
                                            value={this.state.body}
                                            onChange={this.handleChangeBok}
                                            required />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                    <button type="submit" className="btn btn-primary">BOKを投稿</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(BokModal);
