import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    render(){
        const likeBok = this.props.likeBok;

        return (
            <table border="1"><tbody>
                <tr>
                    <td>
                        <table border="1"><tbody>
                            <tr><td><img src={likeBok.id} /></td></tr>
                            <tr><td>{likeBok.book_user_id}</td></tr>
                            <tr><td>{likeBok.page_num_begin}~{likeBok.page_num_end} {likeBok.line_num}行目</td></tr>
                        </tbody></table>
                    </td><td>
                        <table border="1"><tbody>
                            <tr><td colSpan="3">{likeBok.user_id}</td></tr>
                            <tr><td colSpan="3">{likeBok.body}</td></tr>
                            <tr>
                                <td>{likeBok.created_at}</td>
                                <td><img src="like.png" /></td>
                                <td><img src="love.png" /></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        );
    }
}
