import React, { Component } from "react";
import { fetchUserBookDetail, fetchUser } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";

import { Loading } from "./shared/Loading";
import { Bok } from "./Bok";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";
import { BookInfo } from "./shared/book/BookInfo";
import { BokModal } from "./BokModal";
import { ReviewModal } from "./ReviewModal";


export class UserBookDetail extends Component {
    constructor(props){
        super(props);

        this.readingStatus = [
            { id: 0, name: 'none', intl: '未設定' },
            { id: 5, name: 'wanted', intl: '欲しい' },
            { id: 10, name: 'unread', intl: '積読' },
            { id: 15, name: 'reading', intl: '読書中' },
            { id: 20, name: 'readed', intl: '読書了' },
        ];
    };

    componentDidMount(){
        const userId = parseInt(this.props.match.params.userId);
        const userBookId = parseInt(this.props.match.params.userBookId);
        store.dispatch(fetchUserBookDetail(userId, userBookId));
        store.dispatch(fetchUser(userId));
    };

    render(){
        if(isEmpty(this.props.userBookDetail) || isEmpty(this.props.user)){
            return <Loading />;
        }

        // 読書状況の選択リスト
        const bindedStatuses = this.readingStatus.map((stat) => (
            <option key={stat.id} value={stat.name}>{stat.intl}</option>
        ));

        const boks = this.props.userBookDetail.boks.map((bok) => {
            return <div className="mt-2" key={bok.id}><Bok bok={bok}/></div>
        })

        const { book, review } = this.props.userBookDetail;
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
                                    <select name="reading_status" className="form-control form-control-sm">
                                        {bindedStatuses}
                                    </select>
                                </div>

                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input id="spoiler_check"
                                            type="checkbox"
                                            name="is_spoiler"
                                            className="form-check-input"
                                            value="true"/>
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

