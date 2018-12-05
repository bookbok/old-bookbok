import React, { Component } from "react";
import { fetchLikeBokList } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { Bok } from "./Bok.jsx";

export class LikeBokList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        console.log("(Like)componentDidMount : " + userId);
        //store.dispatch(fetchLikeBokList(userId));
    };

    render(){
        //const likeBoks = this.props.likeBokList;
        const likeBoks = [{
            'cover'    : 'cover1.png',
            'bookName' : 'ゼロからわかるRuby超入門(かんたんIT基礎講座)',
            'userName' : 'wakamaka1122',
            'review'   :   'めっちゃすごい',
            'likeMark' : 'like.png',
            'loveMark' : 'love.png'
        }, {
            'cover'    : 'cover2.png',
            'bookName' : '簡単&節約！ボリュームおかず',
            'userName' : 'program_kakenai',
            'review'   : '飯テロ許さない',
            'likeMark' : 'like.png',
            'loveMark' : 'love.png'
        }];
        console.table(likeBoks);

        if(isEmpty(likeBoks)){
            return <Loading />;
        }

        const Boks = likeBoks.map((likeBok) => {
            return <Bok likeBok={likeBok} />
        })
        console.log("(like)Boks↓");
        console.table(Boks);

        return (
            <p>LikeBok一覧</p>
        );
    }
}
