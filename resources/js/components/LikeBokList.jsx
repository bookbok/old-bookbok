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
        return (<div>LIKE BOK 一覧</div>);
    }
}
