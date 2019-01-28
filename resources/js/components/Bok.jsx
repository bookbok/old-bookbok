import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";
import { requestLike, requestUnLike,
         requestLove, requestUnLove,
         setAlertMessage, deleteAlertMessage} from "../actions";
import { getAuthUser } from "../utils";
import { Link } from 'react-router-dom';

export class Bok extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLiked: this.props.bok.liked == "0" ? false : true,
            isLoved: this.props.bok.loved == "0" ? false : true,
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
        if(!getAuthUser()){
            store.dispatch(setAlertMessage("warning", {__html: "<div><a href='/login'>ログイン</a>してください</div>"}));
            setTimeout(
                () => { store.dispatch(deleteAlertMessage()); },
                10000
            );
            return;
        }

        if(this.state.isLiked){
            this.setState({
                isLiked: false,
                likeCount: this.state.likeCount-1
            });
            requestUnLike(bokId);
        } else {
            this.setState({
                isLiked: true,
                likeCount: this.state.likeCount+1
            });
            requestLike(bokId);
        }
    }

    clickLove(bokId, e){
        if(!getAuthUser()){
            store.dispatch(setAlertMessage("warning", {__html: "<div><a href='/login'>ログイン</a>してください</div>"}));
            setTimeout(
                () => { store.dispatch(deleteAlertMessage()); },
                10000
            );
            return;
        }

        if(this.state.isLoved){
            this.setState({
                isLoved: false,
                loveCount: this.state.loveCount-1
            });
            requestUnLove(bokId);
        } else {
            this.setState({
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
        const likeClass = (!this.state.isLiked ?  "far fa-thumbs-up fa-fw icon" : "fas fa-thumbs-up fa-fw icon like-animation");
        const loveClass = (!this.state.isLoved ? "far fa-bookmark fa-fw icon" : "fas fa-bookmark fa-fw icon love-animation");

        return (
            <div className="card p-2">
                <div className="d-flex">
                    <div className="d-flex flex-column bok-book-cover-area">
                        <Link to={`/books/${bok.user_book.book.id}`}>
                            <img className="bok-book-cover mx-auto d-block" src={userBook.book.cover}/>
                        </Link>
                    </div>

                    {/* bok ---------------------------------------------------------------- */}
                    <div className="bok-area">
                        <div className="d-flex flex-column h-100">
                            <div className="d-flex border-bottom">
                                <div className="bok-user mr-auto">
                                    <Link to={`/users/${userBook.user_id}`}>{userBook.user.name}</Link>
                                </div>
                            </div>
                            <pre className="bok-body mt-2">{bok.body}</pre>

                            {/* bok-footer */}
                            <div className="d-flex bok-footer mt-2">
                                <div className="text-muted page-line-updated">
                                    <div className="bok-page">{page}</div>
                                    <div className="bok-line ml-1 mr-3">{line}</div>
                                    <div className="bok-updated">{bok.updated_at}</div>
                                </div>
                                <div className="d-flex ml-auto mt-auto">
                                    <div className="align-top" onClick={(e) => this.clickLike(bok.id)}>
                                        <p className="liked mr-2">
                                            <i className={likeClass}></i>
                                            {this.state.likeCount}
                                        </p>
                                    </div>
                                    <div onClick={(e) => this.clickLove(bok.id)}>
                                        <p className="loved">
                                            <i className={loveClass}></i>
                                            {this.state.loveCount}
                                        </p>
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
