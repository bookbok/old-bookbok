import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.state = {
            likeClass: "far fa-heart",
            loveClass: "far fa-heart",
            isLiked: false,
            isLoved: false,
        };
        this.clickLike = this.clickLike.bind(this);
        this.clickLove = this.clickLove.bind(this);
    }

    clickLike(e){
        console.log("like!");
        if(this.state.isLiked){
            this.setState({likeClass: "far fa-heart", isLiked: false});
        } else {
            this.setState({likeClass: this.state.likeClass + " fas fa-heart", isLiked: true});
        }
    }

    clickLove(e){
        console.log("love!");
        if(this.state.isLoved){
            this.setState({loveClass: "far fa-heart", isLoved: false});
        } else {
            this.setState({loveClass: this.state.loveClass + " fas fa-heart", isLoved: true});
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
                    <div className="d-flex flex-column">
                        <img src="hoge.png"/>
                        <p className="font-weight-bold">本のタイトル</p>
                        <p className="text-muted">{page} 何行目</p>
                    </div>

                    <div className="w-100">
                        <div className="d-flex flex-column">
                            <p>ユーザ名</p>
                            <p>なんかすごくすごかった</p>

                            <div className="d-flex">
                                <p>更新日時</p>
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
