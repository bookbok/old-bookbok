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
            <table border="1"><tbody>
                <tr>
                    <td valign="top">
                        <table border="1"><tbody>
                            <tr><td><img src={bok.user_book.book.cover} /></td></tr>
                            <tr><td>{bok.user_book.book.name}</td></tr>
                            <tr><td>{page} {bok.line_num}行目</td></tr>
                        </tbody></table>
                    </td>
                    <td valign="top">
                        <table border="1"><tbody>
                            <tr><td colSpan="3">{user.name}</td></tr>
                            <tr><td colSpan="3">{bok.body}</td></tr>
                            <tr>
                                <td>{likeBok.updated_at}</td>
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
