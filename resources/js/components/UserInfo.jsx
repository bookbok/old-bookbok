import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { fetchUserInfo } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";

export class UserInfo extends Component {
    componentDidMount(){
        store.dispatch(fetchUserInfo());
    };

    render() {
        if(isEmpty(this.props.userInfo)){
            return <Loading />;
        }

        const userInfo = this.props.userInfo.map((user, i) => (
            <div className="card border-secondary mb-2" key={i}>
                <div className="card-body d-flex">
                    <img src={user.avatar} height="40" />
                    <div className="ml-2">
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        <div className="small text-muted">
                            {user.created_at}
                        </div>
                    </div>
                </div>
            </div>
        ));


        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="mt-4 mb-4 mr-2">ユーザー一覧</h1>
                        { userInfo }
                    </div>
                </div>
            </div>
        );
    }
}

