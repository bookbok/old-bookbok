import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);

        this.likeClass = "like";
        this.loveClass = "love";
    }

    render(){
        const likeBok = this.props.likeBok;
        let page = "p" + likeBok.page_num_begin;
        if(likeBok.page_num_begin !== likeBok.page_num_end){
            page += (" ~ p" + likeBok.page_num_end);
        }

        const clickLike = (e) => {
            console.log("like!");
        }

        const clickLove = (e) => {
            console.log("love!");
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
                                <td><div className={this.likeClass} onClick={clickLike}/></td>
                                <td><div className={this.loveClass} onClick={clickLove}/></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}
