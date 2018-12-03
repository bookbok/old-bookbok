import React, { Component } from "react";
//import { fetchUsersBookshelf } from "../actions.js";
import { store } from "../store";
import { Loading } from "./shared/Loading";
import { Bok } from "./Bok.jsx";

export class LikeBokList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("componentDidMount : ");
        //store.dispatch(fetchLikeBokList(userId));
    };

    render(){
        const userId = parseInt(this.props.match.params.id);
        const likeBoks = [{
            'cover'   : 'cover.png',
            'bookName': 'ゼロからわかるRuby超入門(かんたんIT基礎講座)',
            'userName': 'wakamaka1122',
            'review'  : 'めっちゃすごい',
            'likeMark': 'like.png',
            'loveMark': 'love.png'
        }, {
            'cover'   : 'cover2.png',
            'bookName': '簡単&節約！ボリュームおかず',
            'userName': 'program_kakenai',
            'review'  : '飯テロ絶対許さないマン',
            'likeMark': 'like.png',
            'loveMark': 'love.png'
        }];
        console.table({likeBoks});
        const Boks = likeBoks.map((likeBok) => {
            return <Bok bok={likeBok} />
        })
        console.table({Boks});

        return (
            <p>LikeBok一覧</p>
        );
    }
}
