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

        const originBoks = this.props.userBookDetail.boks;
        const boks = originBoks.map((bok) => {
            return <div className="mt-2" key={bok.id}><Bok bok={bok}/></div>
        })

        const { book, review } = this.props.userBookDetail;
        const user = this.props.user;
        return (

            <div className="page-content-wrap row row-book-detail">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
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

