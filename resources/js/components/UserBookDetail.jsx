import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { fetchUserBookDetail, fetchUser, setUserBookDetail } from "../actions.js";
import { store } from "../store";
import { isEmpty, getAuthUser } from "../utils.js";

import { Loading } from "./shared/Loading";
import { Bok } from "./Bok";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";
import { BookInfo } from "./shared/book/BookInfo";
import { BokModal } from "./BokModal";
import { ReviewModal } from "./ReviewModal";


export class UserBookDetail_ extends Component {
    constructor(props){
        super(props);

        this.readingStatus = [
            { id: 0, name: 'none', intl: '未設定' },
            { id: 5, name: 'wanted', intl: '欲しい' },
            { id: 10, name: 'unread', intl: '積読' },
            { id: 15, name: 'reading', intl: '読書中' },
            { id: 20, name: 'readed', intl: '読書了' },
        ];
        this.handleUpdate = this.handleUpdate.bind(this);
    };

    componentDidMount(){
        const userId = parseInt(this.props.match.params.userId);
        const userBookId = parseInt(this.props.match.params.userBookId);
        store.dispatch(fetchUserBookDetail(userId, userBookId));
        store.dispatch(fetchUser(userId));
    };

    // idを元にサーバーに送信する値を返す
    getStatusNameFromId(id) {
        return (this.readingStatus.filter((val) => (val.id == id))[0]).name;
    }

    handleUpdate(e) {
        if(isEmpty(getAuthUser())){
            return this.props.history.push('/login');
        }

        let body = {
            reading_status: this.getStatusNameFromId(this.props.userBookDetail.reading_status),
            is_spoiler: this.props.userBookDetail.is_spoiler,
        };
        const name = e.target.name;
        if(name === 'reading_status') {
            body = { ...body, reading_status: this.getStatusNameFromId(e.target.value) };
        }else if(name === 'is_spoiler') {
            body = { ...body, is_spoiler: e.target.checked };
        }

        requestUpdateUserBookStatus(
            this.props.match.params.userId,
            this.props.match.params.userBookId,
            body
        ).then(() => {
            // TODO: Bootstrap alertで更新したことを通知する
        });
    }

    render(){
        if(isEmpty(this.props.userBookDetail) || isEmpty(this.props.user)){
            return <Loading />;
        }
        const userBook = this.props.userBookDetail;

        // 読書状況の選択リスト
        const bindedStatuses = this.readingStatus.map((stat) => (
            <option key={stat.id}
                value={stat.id}>
                {stat.intl}
            </option>
        ));

        const boks = userBook.boks.map((bok) => {
            return <div className="mt-2" key={bok.id}><Bok bok={bok}/></div>
        })

        const { book, review } = userBook;
        const user = this.props.user;
        return (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <div>
                                <div className="form-group">
                                    <label>
                                        読書状況
                                    </label>
                                    <select name="reading_status"
                                        className="form-control form-control-sm"
                                        value={userBook.reading_status}
                                        onChange={this.handleUpdate} >
                                        {bindedStatuses}
                                    </select>
                                </div>

                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input id="spoiler_check"
                                            type="checkbox"
                                            name="is_spoiler"
                                            className="form-check-input"
                                            value="true"
                                            onChange={this.handleUpdate}
                                            checked={userBook.is_spoiler} />
                                        <small>ネタバレを含む</small>
                                    </label>
                                </div>
                            </div>
                            <hr />

                            <BookInfo book={book} />
                            <hr />
                            <h3 className="mt-5">レビュー<div className="float-right"><ReviewModal /></div></h3>
                            <p className="mt-4">{review.body}</p>
                            <hr />
                            <h3 className="mt-5">Boks <div className="float-right"><BokModal /></div></h3>
                            <div className="mt-4">{boks}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const UserBookDetail = withRouter(UserBookDetail_);

import { DOMAIN } from '../domain';
import * as utils from '../utils';
import * as types from '../types';

export const requestUpdateUserBookStatus = (userId, userBookId, body) => {
    return utils.wrapFetch(DOMAIN + `/api/users/${userId}/user_books/${userBookId}`, {
        method: 'PUT',
        body: body,
    }).then(json => {
        store.dispatch(setUserBookDetail(json));
    });
}
