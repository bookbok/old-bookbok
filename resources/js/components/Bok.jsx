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
            'cover':    'get_cover.png',
            'bookName': 'get_ゼロからわかるRuby超入門(かんたんIT基礎講座)',
            'userName': 'get_wakamaka1122',
            'review':   'get_めっちゃすごい',
            'likeMark': 'get_like.png',
            'loveMark': 'get_love.png'
        }

        return (
            <table border="1"><tbody>
                <tr><th colSpan="3">Bok</th></tr>
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
