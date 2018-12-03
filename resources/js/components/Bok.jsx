import React, { Component } from "react";
//import { fetchUsersBookshelf } from "../actions.js";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class Bok extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //store.dispatch(fetchLikeBokList(userId));
    };

    render(){
        const bokData = {
            'cover':    'cover.png',
            'bookName': 'ゼロからわかるRuby超入門(かんたんIT基礎講座)',
            'userName': 'wakamaka1122',
            'review':   'めっちゃすごい',
            'likeMark': 'like.png',
            'loveMark': 'love.png'
        };

        return (
            <table border="1"><tbody>
                <tr><th>Bok</th></tr>
                <tr>
                    <td><img src={bokData.cover} /></td>
                    <td><p>{bokData.bookName}</p></td>
                    <td><p>{bokData.userName}</p></td>
                </tr>
                <tr>
                    <td colSpan="3">{bokData.review}</td>
                </tr>
                <tr>
                    <td></td>
                    <td><img src={bokData.likeMark} /></td>
                    <td><img src={bokData.loveMark} /></td>
                </tr>
            </tbody></table>
        );
    }
}
