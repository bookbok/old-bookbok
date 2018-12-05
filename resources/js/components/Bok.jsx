import React, { Component } from "react";
import { store } from "../store";
import { Loading } from "./shared/Loading";
import { LikeBokList } from "./LikeBokList.jsx";

export class Bok extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("(Bok)componentDidMount");
    };

    render(){
        console.table(this.props.likeBok);
        const likeBok = this.props.likeBok;

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src={likeBok.cover} /></td>
                    <td><p>{likeBok.bookName}</p></td>
                    <td><p>{likeBok.userName}</p></td>
                </tr>
                <tr>
                    <td colSpan="3">{likeBok.review}</td>
                </tr>
                <tr>
                    <td></td>
                    <td><img src={likeBok.likeMark} /></td>
                    <td><img src={likeBok.loveMark} /></td>
                </tr>
            </tbody></table>
        );
    }
}
