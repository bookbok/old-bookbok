import React, { Component } from "react";
import { fetchUserInfo } from "../actions.js";
import { store } from "../index";


export class UserInfo extends Component {

    constructor(props){
        super(props);
    };

    componentDidMount(){
        store.dispatch(fetchUserInfo());
    };

    render() {

//        if(isEmpty(this.props.userInfo)){
//            console.log("empty");
//        }

        if(this.props.userInfo == []){
            console.log("error");
            return;
        }

        const userInfo = this.props.userInfo;

        console.log(userInfo);

        console.log(userInfo[0]);

        return (
            <div>
                ユーザー情報↓
            
            </div>
        );
    }
}

