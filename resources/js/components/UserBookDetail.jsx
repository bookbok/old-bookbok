import React, { Component } from "react";
import { fetchUserBookDetail } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";

import { Loading } from "./shared/Loading";
import { Bok } from "./Bok";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";
import { BookInfo } from "./shared/book/BookInfo";
import { Contribution } from "./Contribution";
import { Review } from "./Review";


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
                            <BookInfo book={book} />
                            <hr />
                            <h3 className="mt-5">レビュー<div className="float-right"><Review /></div></h3>
                            <p className="mt-4">{review.body}</p>
                            <hr />
                            <h3 className="mt-5">Boks <div className="float-right"><Contribution /></div></h3>
                            <p className="mt-4">{boks}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

