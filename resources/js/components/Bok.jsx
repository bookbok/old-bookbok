import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        console.table(this.props.likeBok);
        const likeBok = this.props.likeBok;
        const dummy = [
            "cover"         :"cover.png",
            "bookName"      :"Ruby超入門",
            "page_num_begin":"120",
            "page_num_end"  :"121",
            "line_num"      :"32",
            "userName"      :"wakamaka1122",
            "body"          :"RubyがRubyですごくRubyだからまじRubyで超Ruby",
            "date"          :"2018/12/12",
            "time"          :"20:32",
            "likeMark"      :"like.png",
            "loveMark"      :"lovaMark.png"
        ]

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
