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
        const longBody = "バカみたいな夢を笑わないで聞いてほしい。日が暮れる前に話しておきたい。君みたいに優しくなりたいだけ。祈る声は激しくあと少しだけ心の底から触れ合うまで君と繋がっていたいだけ。泣きじゃくるだけじゃ何もないとわかったから傷つけた事を謝りに行こう。いつまでも近くにいてほしいだけ。さよならが言えなくて恐ろしいだけ。あふれる光に手が震えたって君となら強くなれるだけ。君みたいに優しくなりたいだけ。祈る声は激しくあと少しだけ心の底から触れ合うまで君と繋がっていたいだけ。怯えてばかりで恥ずかしくなるよ。そこから見ていてね大丈夫ありがとう。";
        const shortBody = "Nighthawks";

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
                    <div className="d-flex flex-column book-info m-2">
                        <img src="http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"/>
                        <p className="font-weight-bold">userBook.book.name</p>
                        <div className="text-muted book-footer">
                            <p>{page}<br/>{line}</p>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="d-flex flex-column m-2">
                            <p className="bok-user">userBook.user.name</p>
                            <hr/>
                            <p className="bok-body">{longBody}</p>

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
