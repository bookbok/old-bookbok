import React, { Component } from "react";
import { fetchUserBookDetail } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { Bok } from "./Bok.jsx";

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
        const boks = originBoks.map((bok, i) => {
            return <div className="mt-2" key={i}><Bok bok={bok}/></div>
        })

        const user = this.props.userBookDetail.user;
        const book = this.props.userBookDetail.book;
        const review = this.props.userBookDetail.review;
        return (
            <div className="page-content-wrap row">
                <div className="sub-content card col-md-7">
                    <div className="d-flex">
                        <div>
                            <a href={`/users/${user.id}`} className="text-body">
                                <img src={user.avatar} className="user-info-avatar" />
                                <p className="h4 font-weight-bold">{user.name}</p>
                            </a>
                        </div>

                        <div className="user-follow-info mt-2">
                            <a href={`/users/${user.id}/followers`} className="m-2">14 フォロー</a>
                            <a href={`/users/${user.id}/followings`} className="m-2">127 フォロワー</a>
                        </div>
                    </div>
                    <button
                        onClick={this.handleClickFollow}
                        className="btn btn-primary user-follow-btn">
                        フォローする
                    </button>

                    <div className="user-info-accordion mt-2">
                        <label htmlFor="user-info-accordion-check" className="accordion-label text-center mt-2">
                            <i className="fas fa-angle-down"></i> 詳細を表示する
                        </label>
                        <input type="checkbox" id="user-info-accordion-check" className="user-info-accordion-check" />
                        <pre className="user-info-description mt-4 mb-0">{book.description}</pre>
                    </div>
                </div>

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <div className="d-flex">
                                <img src={book.cover} className="title-book-cover"/>
                                <h1>
                                    <a href={`/books/${book.id}`}
                                       className="ml-2 d-block text-success title-book-name">
                                        {book.name}
                                    </a>
                                </h1>
                            </div>
                            <h3 className="mt-5">概要</h3>
                            <p>{book.description}</p>

                            <h3 className="mt-5">レビュー</h3>
                            <p>{review.body}</p>
                            <hr />
                            <h3 className="mt-5">Boks</h3>
                            {boks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

