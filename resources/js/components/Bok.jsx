import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";
import { BrowserRouter, Route, Link, Swirch } from 'react-router-dom';
import { requestLike, requestUnLike } from "../actions";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.state = {
            likeClass: "far fa-thumbs-up fa-fw icon",
            loveClass: "far fa-bookmark fa-fw icon",
            isLiked: false,
            isLoved: false,
            likeCount: parseInt(this.props.bok.liked_count),
            loveCount: parseInt(this.props.bok.loved_count)
        };
        this.clickLike = this.clickLike.bind(this);
        this.clickLove = this.clickLove.bind(this);
    }

    makePageViewStr(bok) {
        let page = null;
        if(bok.page_num_begin !== null){
            page = ("p" + bok.page_num_begin);
            if((bok.page_num_begin !== bok.page_num_end) && bok.page_num_end !== null){
                page += (" ~ p" + bok.page_num_end);
            }
        }
        return page;
    }

    makeLineViewStr(bok) {
        let line = null;
        if(bok.line_num !== null){
            line = (bok.line_num + "行目");
        }
        return line;
    }

    clickLike(bokId, e){
        if(this.state.isLiked){
            this.setState({
                likeClass: "far fa-thumbs-up fa-fw icon",
                isLiked: false,
                likeCount: this.state.likeCount-1
            });
            requestUnLike(bokId);
        } else {
            this.setState({
                likeClass: " fas fa-thumbs-up fa-fw icon like-animation",
                isLiked: true,
                likeCount: this.state.likeCount+1
            });
            requestLike(bokId);
        }
    }

    clickLove(bokid, e){
        if(this.state.isLoved){
            this.setState({
                loveClass: "far fa-bookmark fa-fw icon",
                isLoved: false,
                loveCount: this.state.loveCount-1
            });
            requestUnLove(bokId);
        } else {
            this.setState({
                loveClass: " fas fa-bookmark fa-fw icon love-animation",
                isLoved: true,
                loveCount: this.state.loveCount+1
            });
            requestLove(bokId);
        }
    }

    render(){
        const bok = this.props.bok;
        const userBook = this.props.bok.user_book;
        const page = this.makePageViewStr(bok);
        const line = this.makeLineViewStr(bok);

        return (
            <div className="card p-2">
                <div className="d-flex">
                    <div className="d-flex flex-column bok-book-info mr-3">
                        <Link to={`/books/${bok.user_book.book.id}`}>
                            <img className="bok-book-cover mx-auto d-block" src={userBook.book.cover}/>
                        </Link>
                        <pre className="font-weight-bold bok-book-title">{userBook.book.name}</pre>
                        <div className="text-muted bok-book-footer mt-2">
                            <pre>{page}<br/>{line}</pre>
                        </div>
                    </div>

                    {/* bok ---------------------------------------------------------------- */}
                    <div className="w-100">
                        <div className="d-flex flex-column h-100">
                            <pre className="bok-user border-bottom">{userBook.user.name}</pre>
                            <pre className="bok-body mt-2 mr-2">{bok.body}</pre>

                            {/* bok-footer */}
                            <div className="bok-footer mt-2">
                                <div className="text-muted updated">{bok.updated_at}</div>
                                <div className="float-right">
                                    <div className="d-flex">
                                        <div className="align-top" onClick={(e) => this.clickLike(bok.id)}>
                                            <p className="liked mr-2">
                                                <i className={this.state.likeClass}></i>
                                                {this.state.likeCount}
                                            </p>
                                        </div>
                                        <div onClick={(e) => this.clickLove(bok.id)}>
                                            <p className="loved">
                                                <i className={this.state.loveClass}></i>
                                                {this.state.loveCount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
