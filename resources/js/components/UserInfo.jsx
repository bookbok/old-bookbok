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
            console.log("empty");
            return<div></div>;
        }

        const userInfo = this.props.userInfo.map(( info, i ) => (
            <div key={i}>
                <table className="table table-condensed">
                    <tbody>
                        <tr>
                      {/*      <th>{info.avatar}</th>   */}
                            <th>{info.name}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        ));

        console.log(userInfo);

        return (
            <div>
                ユーザー名
                { userInfo }
            </div>
        );
    }
}

