import React, { Component } from "react";
import { store } from "../../store";
import { Loading } from "../shared/Loading";
import { requestLike, requestUnLike, requestLove, requestUnLove } from "../../actions";
import { Link } from 'react-router-dom';

export class UserDetailBok extends Component {
    constructor(props){
        super(props);

        this.state = {
            likeClass: this.props.bok.liked == "0" ?  "far fa-thumbs-up fa-fw icon" : "fas fa-thumbs-up fa-fw icon like-animation",
            loveClass: this.props.bok.loved == "0" ? "far fa-bookmark fa-fw icon" : "fas fa-bookmark fa-fw icon love-animation",
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

    clickLove(bokId, e){
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

                    {/* bok ---------------------------------------------------------------- */}
                    <div className="w-100">
                        <div className="d-flex flex-column h-100">
                            <pre className="userd-bok-user border-bottom">{userBook.user.name}</pre>
                            <pre className="userd-bok-body mt-2 mr-2">{bok.body}</pre>

                            {/* bok-footer */}
                            <div className="d-flex userd-bok-footer mt-2">
                                <div className="text-muted userd-page-line-updated mt-auto">
                                    <div className="userd-page">{page}</div>
                                    <div className="userd-line ml-1 mr-3">{line}</div>
                                    <div className="userd-updated">{bok.updated_at}</div>
                                </div>
                                <div className="d-flex ml-auto mt-auto">
                                    <div onClick={(e) => this.clickLike(bok.id)}>
                                        <p className="liked mr-2 mt-auto mb-auto">
                                            <i className={this.state.likeClass}></i>
                                            {this.state.likeCount}
                                        </p>
                                    </div>
                                    <div onClick={(e) => this.clickLove(bok.id)}>
                                        <p className="loved mt-auto mb-auto">
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
        );
    }
}

export default UserDetailBok;
