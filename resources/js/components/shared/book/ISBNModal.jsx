import React, { Component } from "react";
import ReactDOM from 'react-dom';

export class ISBNModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isbn: null };
        this.handleChangeISBN = this.handleChangeISBN.bind(this);
    }

    componentDidMount() {
        // モーダル展開時に入力欄autofocus
        $('#ISBNModal').on('shown.bs.modal', () => {
            $('#inputISBN').trigger('focus')
        });
    }

    handleChangeISBN(e) {
        this.setState({ isbn: e.target.value });
        ReactDOM.findDOMNode(this.refs.isbn).value = e.target.value;
    }

    handleRegisterISBN(e) {
        e.preventDefault();

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

                            <div className="modal-body">
                                <input id="inputISBN"
                                    type="number"
                                    min="0"
                                    max="9999999999999"
                                    className="form-control form-control-lg"
                                    placeholder="9784041026168"
                                    onChange={this.handleChangeISBN}
                                    ref="isbn"
                                    required />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                <button type="button"
                                    className="btn btn-success"
                                    onClick={this.handleRegisterISBN}>
                                    登録
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
