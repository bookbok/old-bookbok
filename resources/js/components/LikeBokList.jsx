import React, { Component } from "react";
//import { fetchUsersBookshelf } from "../actions.js";
import { store } from "../store";
import { Loading } from "./shared/Loading";

export class LikeBokList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        console.log({userId});
        //store.dispatch(fetchLikeBokList(userId));
    };

    render(){
        const cover="cover.png";
        const bookName="ゼロからわかるRuby超入門(かんたんIT基礎講座)";
        const userName="wakamaka1122";
        const review="めっちゃすごい";
        const likeMark="like.png";
        const loveMark="love.png";

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src={cover} /></td>
                    <td><p>{bookName}</p></td>
                    <td><p>{userName}</p></td>
                </tr>
                <tr>
                    <td colSpan="3">{review}</td>
                </tr>
                <tr>
                    <td></td>
                    <td><img src={likeMark} /></td>
                    <td><img src={loveMark} /></td>
                </tr>
            </tbody></table>
        );
    }
}
