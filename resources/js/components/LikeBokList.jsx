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
        const userId = parseInt(this.props.match.params.id);
        console.log({userId});
        //store.dispatch(fetchLikeBokList(userId));
    };

    render(){
        return (
            <p>LikeBokList.jsx</p>
        );
    }
}
