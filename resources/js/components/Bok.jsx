import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    render(){
        const likeBok = this.props.likeBok;

        return (
            <table border="1"><tbody>
                <tr>
                    <td valign="top">
                        <table border="1"><tbody>
                            <tr><td><img src="likeBok.bok.cover" /></td></tr>
                            <tr><td>likeBok.book.name</td></tr>
                            <tr><td>p{likeBok.page_num_begin}~p{likeBok.page_num_end} {likeBok.line_num}行目</td></tr>
                        </tbody></table>
                    </td><td valign="top">
                        <table border="1"><tbody>
                            <tr><td colSpan="3">likeBok.user.name</td></tr>
                            <tr><td colSpan="3">{likeBok.body}</td></tr>
                            <tr>
                                <td>{likeBok.created_at}</td>
                                <td><div className="heart"/></td>
                                <td><div className="heart"/></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}
