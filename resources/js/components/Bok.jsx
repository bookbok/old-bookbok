import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.state = {
            likeClass: "like",
            loveClass: "love",
            isLiked: false,
            isLoved: false,
        };
        this.clickLike = this.clickLike.bind(this);
        this.clickLove = this.clickLove.bind(this);
    }

    clickLike(e){
        if(this.state.isLiked){
            this.setState({likeClass: "like", isLiked: false});
        } else {
            this.setState({likeClass: this.state.likeClass + " liked", isLiked: true});
        }
    }

    clickLove(e){
        if(this.state.isLoved){
            this.setState({loveClass: "love", isLoved: false});
        } else {
            this.setState({loveClass: this.state.loveClass + " loved", isLoved: true});
        }
    }

    render(){
        const likeBok = this.props.likeBok;
        const bok = this.props.likeBok.bok;
        const user = this.props.likeBok.user;

        let page = "p" + bok.page_num_begin;
        if(bok.page_num_begin !== bok.page_num_end){
            page += (" ~ p" + bok.page_num_end);
        }

        return (
            <div className="card">
                <div className="d-flex">
                    <div className="d-flex flex-column" margin-left="50%">
                        <img src="hoge.png"/>
                        <p>本のタイトル</p>
                        <p>{page} 何行目</p>
                    </div>
                    <div className="d-flex flex-column">
                        <p>ユーザ名</p>
                        <p>なんかすごくすごかった</p>
                        <div className="d-flex">
                            <p>更新日時</p>
                            <p>☆ ♡</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
