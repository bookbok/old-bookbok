import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.likeClass = "like";
        this.loveClass = "love";
        this.likeFlg = false;
        this.loveFlg = false;
        this.clickLike = this.clickLike.bind(this);
        this.clickLove = this.clickLove.bind(this);
    }

    clickLike(e){
        if(!this.likeFlg){
            this.likeClass += " liked";
            this.likeFlg = true;
        } else {
            this.likeClass = "like";
            this.likeFlg = false;
        }
        console.log("likeClass : " + this.likeClass);
        console.log("likeFlg : " + this.likeFlg);
    }

    clickLove(e){
        if(!this.loveFlg){
            this.loveClass += " loved";
            this.loveFlg = true;
        } else {
            this.loveClass = "love";
            this.loveFlg = false;
        }
        console.log("loveClass : " + this.loveClass);
        console.log("loveFlg : " + this.loveFlg);
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
                                <td><div className={this.likeClass} onClick={this.clickLike}/></td>
                                <td><div className={this.loveClass} onClick={this.clickLove}/></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}
