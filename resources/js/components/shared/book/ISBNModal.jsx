import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { storeISBNToUserBookDirect } from "../../../actions";

// ファイル下部でwithRouterに食わせているため、名前を特殊にしている
class ISBNModal_ extends Component {
    // HACK: サーバー側から帰ってきたちゃんとしたメッセージに置き換える。
    static get INVALID_ISBN_LENGTH(){ return '入力されたISBNの形式が間違っています'; }
    static get NOT_FOUND_ISBN() { return 'お探しのISBNが存在しません'; }

    constructor(props) {
        super(props);

        this.state = { isbn: "", isInvalid: false, invalidMessage: "" };
        this.handleRegisterISBN = this.handleRegisterISBN.bind(this);
    }

    componentDidMount() {
        // モーダル展開時に入力欄autofocus
        $('#ISBNModal').on('shown.bs.modal', () => {
            $('#inputISBN').trigger('focus')
        });
    }

    handleRegisterISBN(e) {
        e.preventDefault();
        if(this.state.isbn.length !== 13 && this.state.isbn.length !== 10) {
            this.setState({ isInvalid: true, invalidMessage: ISBNModal.INVALID_ISBN_LENGTH });
            return;
        }

        storeISBNToUserBookDirect(1, this.state.isbn).then(res => {
            $('#ISBNModal').modal('hide'); // hideしないと画面がバグる
            this.props.history.push(`/users/${res.user.id}/user_books/${res.id}`);
        }).catch(err => {
            console.log(err);
            this.setState({ isInvalid: true, invalidMessage: ISBNModal.NOT_FOUND_ISBN });
        });
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#ISBNModal">
                    ISBNから本棚に登録
                </button>

                <div className="modal fade" id="ISBNModal" tabIndex="-1" role="dialog" aria-labelledby="ISBNModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ISBNModalTitle">ISBNを入力して本棚に追加しましょう</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="閉じる">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={this.handleRegisterISBN}>
                                <div className="modal-body">
                                    <input id="inputISBN"
                                        type="number"
                                        min="0"
                                        max="9999999999999"
                                        className={`form-control form-control-lg ${this.state.isInvalid && 'is-invalid'}`}
                                        placeholder="9784041026168"
                                        value={this.state.isbn}
                                        onChange={(e) => this.setState({ isbn: e.target.value })}
                                        ref="isbn"
                                        required />
                                    <div className="invalid-feedback">
                                        {this.state.invalidMessage}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                    <button type="submit" className="btn btn-success">登録</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export const ISBNModal = withRouter(ISBNModal_);