import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.state = {
            likeClass: "far fa-thumbs-up icon",
            loveClass: "far fa-bookmark icon",
            isLiked: false,
            isLoved: false,
        };
        this.clickLike = this.clickLike.bind(this);
        this.clickLove = this.clickLove.bind(this);
    }

    clickLike(e){
        if(this.state.isLiked){
            this.setState({likeClass: "far fa-thumbs-up icon", isLiked: false});
        } else {
            this.setState({likeClass: " fas fa-thumbs-up icon like-animation", isLiked: true});
        }
    }

    clickLove(e){
        if(this.state.isLoved){
            this.setState({loveClass: "far fa-bookmark icon", isLoved: false});
        } else {
            this.setState({loveClass: " fas fa-bookmark icon love-animation", isLoved: true});
        }
    }

    render(){
        const bok = this.props.bok;
        const userBook = this.props.bok.user_book;
        const debugLongBody = "あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ";
        const debugShortBody = "Nighthawks";

        let page = "p" + bok.page_num_begin;
        if(bok.page_num_begin !== bok.page_num_end){
            page += (" ~ p" + bok.page_num_end);
        }

        let line = bok.line_num;
        if(line !== null){
            line += "行目";
        }

        return (
            <div className="card p-2">
                <div className="d-flex">
                    <div className="d-flex flex-column book-info mr-2">
                        <img src="http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"/>
                        <p className="font-weight-bold">userBook.book.name</p>
                        <div className="text-muted book-footer">
                            <p>{page}<br/>{line}</p>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="d-flex flex-column h-100">
                            <p className="bok-user">userBook.user.name</p>
                            <p className="bok-body">{debugShortBody}</p>

                            <div className="d-flex bok-footer">
                                <p className="text-muted w-50">bok.updated_at</p>
                                <div className="w-50">
                                    <div className="float-right">
                                        <div className="d-flex">
                                            <div className="mr-3" onClick={this.clickLike}>
                                                <i className={this.state.likeClass}></i>
                                            </div>
                                            <div className="mr-2" onClick={this.clickLove}>
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
