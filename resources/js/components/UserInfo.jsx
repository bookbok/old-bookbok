import React, { Component } from "react";
import { fetchUserInfo } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";

export class UserInfo extends Component {

    constructor(props){
        super(props);
    };

    componentDidMount(){
        store.dispatch(fetchUserInfo());
    };

    render() {

        if(isEmpty(this.props.userInfo)){
            return<div></div>;
        }

        const userInfo = this.props.userInfo.map(( info, i ) => (
            <div key={i}>
                <div>{info.avatar}</div>
                <div>{info.name}</div>
            </div>
        ));


        return (
            <div>
                <div>ユーザー情報</div>
                { userInfo }
            </div>
        );
    }
}

