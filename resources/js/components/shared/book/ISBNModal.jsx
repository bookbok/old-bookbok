import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { storeISBNToUserBookDirect } from "../../../actions";

export class ISBNModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isbn: "", isInvalid: false };
        this.handleChangeISBN = this.handleChangeISBN.bind(this);
        this.handleRegisterISBN = this.handleRegisterISBN.bind(this);
    }

    componentDidMount() {
        // モーダル展開時に入力欄autofocus
        $('#ISBNModal').on('shown.bs.modal', () => {
            $('#inputISBN').trigger('focus')
        });
    }

    handleChangeISBN(e) {
        this.setState({ isbn: e.target.value });
    }

    handleRegisterISBN(e) {
        e.preventDefault();
        storeISBNToUserBookDirect(1, this.state.isbn).then(res => {
            this.props.history.push(`/users/${res.user.id}/user_books/${res.id}`);
        }).catch(err => {
            this.setState({ isInvalid: true });
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
                                        onChange={this.handleChangeISBN}
                                        ref="isbn"
                                        required />
                                    <div className="invalid-feedback">
                                        入力されたISBNが存在しません
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
