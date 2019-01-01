import React, { Component } from "react";
import { fetchUserBookDetail } from "../actions.js";
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

        this.state = {};
        this.handleClickFollow = this.handleClickFollow.bind(this);
    };

    componentDidMount(){
        const userId = parseInt(this.props.match.params.userId);
        const userBookId = parseInt(this.props.match.params.userBookId);
        store.dispatch(fetchUserBookDetail(userId, userBookId));
    };

    handleClickFollow(){
        // TODO: POST /users/${userId}/follow
    }

    render(){
        if(isEmpty(this.props.userBookDetail)){
            return <Loading />;
        }

        const originBoks = this.props.userBookDetail.boks;
        const boks = originBoks.map((bok) => {
            return <div className="mt-2" key={bok.id}><Bok bok={bok}/></div>
        })

        const { user, book, review } = this.props.userBookDetail;
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
                                        <option value="0">未設定</option>
                                        <option value="1">欲しい</option>
                                        <option value="2">積読</option>
                                        <option value="3">読書中</option>
                                        <option value="4">読書了</option>
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

