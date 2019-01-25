import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { storeISBNToUserBookDirect,
         setAlertMessage, deleteAlertMessage} from "../../../actions";
import { getAuthUser, isEmpty } from '../../../utils';
import { store } from '../../../store';

// ファイル下部でwithRouterに食わせているため、名前を特殊にしている
class ISBNModal_ extends Component {
    // HACK: サーバー側から帰ってきたちゃんとしたメッセージに置き換える。
    static get INVALID_ISBN_LENGTH(){ return '入力されたISBNの形式が間違っています'; }

    constructor(props) {
        super(props);

        this.state = { isbn: "", isInvalid: false, invalidMessage: "" };
        this.handleRegisterISBN = this.handleRegisterISBN.bind(this);
        this.setAlert = this.setAlert.bind(this);
    }

    componentDidMount() {
        // モーダル展開時に入力欄autofocus
        $('#ISBNModal').on('shown.bs.modal', () => {
            $('#inputISBN').trigger('focus')
        });
        $('[data-toggle="popover"]').popover()
    }

    handleRegisterISBN(e) {
        e.preventDefault();
        if(this.state.isbn.length !== 13 && this.state.isbn.length !== 10) {
            return this.setState({ isInvalid: true, invalidMessage: ISBNModal.INVALID_ISBN_LENGTH });
        }

        const user = getAuthUser();
        if(isEmpty(user)) {
            return this.props.history.push('/login');
        }
        storeISBNToUserBookDirect(user.id, this.state.isbn).then(res => {
            if(res.status === 401) {
                this.setState({ isInvalid: true, invalidMessage: 'ログインが必要です' });
                throw new Error();
            } else if(!res.ok) {
                res.json().then(json => {
                    this.setState({ isInvalid: true, invalidMessage: json.userMessage });
                });
                throw new Error();
            }
            return res.json();
        }).then(res => {
            this.props.history.push(`/users/${res.user.id}/user_books/${res.id}`);
        }).catch(()=>{});
    }

    componentWillUnmount() {
        $('#ISBNModal').modal('hide'); // hideしないと画面がバグる
    }

    setAlert(e) {
        store.dispatch(setAlertMessage("warning", {__html: "<div><a href='/login'>ログイン</a>してください</div>"}));
        setTimeout(
            () => { store.dispatch(deleteAlertMessage()); },
            10000
        );
        return;
    }

    render() {
        if(!getAuthUser()){
            return <button type="button" className="btn btn-success" onClick={this.setAlert}>ISBNから本棚に登録</button>;
        }

        return (
            <div>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#ISBNModal">
                    ISBNから本棚に登録
                </button>

                <div className="modal fade" id="ISBNModal" tabIndex="-1" role="dialog" aria-labelledby="ISBNModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ISBNModalTitle">
                                    <button className="btn btn-link font-weight-bold"
                                        data-toggle="popover"
                                        data-trigger="hover"
                                        data-content="書籍に割り振られる「978」または「979」から始まる13桁の数字">
                                        ISBN
                                    </button>
                                    を入力して本棚に追加しましょう
                                </h5>

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
