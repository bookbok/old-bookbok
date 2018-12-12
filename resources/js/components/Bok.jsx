import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.state = {
            likeClass: "far fa-thumbs-up icon-size",
            loveClass: "far fa-heart icon-size",
            isLiked: false,
            isLoved: false,
        };
        this.clickLike = this.clickLike.bind(this);
        this.clickLove = this.clickLove.bind(this);
    }

    clickLike(e){
        if(this.state.isLiked){
            this.setState({likeClass: "far fa-thumbs-up icon-size", isLiked: false});
        } else {
            this.setState({likeClass: this.state.likeClass + " fas fa-thumbs-up icon-size", isLiked: true});
        }
    }

    clickLove(e){
        if(this.state.isLoved){
            this.setState({loveClass: "far fa-heart icon-size", isLoved: false});
        } else {
            this.setState({loveClass: this.state.loveClass + " fas fa-heart icon-size", isLoved: true});
        }
    }

    render(){
        const likeBok = this.props.likeBok;
        const userBook = this.props.likeBok.user_book;

        let page = "p" + likeBok.page_num_begin;
        if(likeBok.page_num_begin !== likeBok.page_num_end){
            page += (" ~ p" + likeBok.page_num_end);
        }

        let line = likeBok.line_num;
        if(line !== null){
            line += "行目";
        }

        return (
            <div className="card">
                <div className="d-flex">
                    <div className="d-flex flex-column book-info">
                        <img src="hoge.png"/>
                        <p className="font-weight-bold">userBook.book.name</p>
                        <div className="text-muted book-footer">
                            <p>{page}<br/>{line}</p>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="d-flex flex-column">
                            <p>userBook.user.name</p>
                            <p>likeBok.body</p>

                            <div className="d-flex bok-footer">
                                <p className="text-muted w-100">likeBok.updated_at</p>
                                <div className="w-100">
                                    <div className="float-right">
                                        <div className="d-flex">
                                            <div onClick={this.clickLike}>
                                                <i className={this.state.likeClass}></i>
                                            </div>
                                            <div onClick={this.clickLove}>
                                                <i className={this.state.loveClass}></i>
                                            </div>
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
