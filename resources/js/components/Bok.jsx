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
        let page = "p" + likeBok.page_num_begin;
        if(likeBok.page_num_begin !== likeBok.page_num_end){
            page += (" ~ p" + likeBok.page_num_end);
        }

        return (
            <table border="1"><tbody>
                <tr>
                    <td valign="top">
                        <table border="1"><tbody>
                            <tr><td><img src="likeBok.bok.cover" /></td></tr>
                            <tr><td>likeBok.book.name</td></tr>
                            <tr><td>{page} {likeBok.line_num}行目</td></tr>
                        </tbody></table>
                    </td>
                    <td valign="top">
                        <table border="1"><tbody>
                            <tr><td colSpan="3">likeBok.user.name</td></tr>
                            <tr><td colSpan="3">{likeBok.body}</td></tr>
                            <tr>
                                <td>{likeBok.created_at}</td>
                                <td><div className={this.state.likeClass} onClick={this.clickLike}/></td>
                                <td><div className={this.state.loveClass} onClick={this.clickLove}/></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}
