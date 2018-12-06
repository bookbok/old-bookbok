import React, { Component } from "react";
import { fetchLikeBoks } from "../actions.js";
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
        store.dispatch(fetchLikeBoks(userId));
    };

    render(){
        const likeBoks = this.props.likeBoks;

        if(isEmpty(likeBoks)){
            return <Loading />;
        }

        const Boks = likeBoks.map((likeBok, index) => {
            return <Bok likeBok={likeBok} key={index} />
        })

        return (
            <div>
                <p>LikeBok一覧</p>
                {Boks}
                <br/>
            </div>
        );
    }
}
