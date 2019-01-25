import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../store";
import { fetchUser, fetchFollowings } from "../actions";
import { isEmpty } from "../utils";

import { Loading } from "./shared/Loading";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";
import { Link } from 'react-router-dom';
import SimpleUser from './shared/user/SimpleUser';

class FollowingsView extends Component {
    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchFollowings(userId));
        fetchUser(userId);
    }

    render() {
        const followings = this.props.followings;
        const user = this.props.user;
        const followList = (view) => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isFollowings userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>フォロー中</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(isEmpty(user)){
            return <Loading />;
        } else if(user && isEmpty(followings)){
            return (
                followList(<Loading />)
            );
        }

        const bindedUsers = followings.map((user, i) => (
            <SimpleUser user={user} key={i} />
        ));

        return (
            followList(bindedUsers)
        );
    }
}

export const ConnectedFollowingsView = connect(
    state => state,
)(FollowingsView);

