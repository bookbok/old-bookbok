import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../store";
import { fetchUser, fetchFollowers } from "../actions";
import { isEmpty } from "../utils";

import { Loading } from "./shared/Loading";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";
import { Link } from 'react-router-dom';
import SimpleUser from './shared/user/SimpleUser';

class FollowersView extends Component {
    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchFollowers(userId));
        fetchUser(userId);
    }

    render() {
        const followers = this.props.followers;
        const user = this.props.user;
        const followerList = (view) => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isFollowers userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>フォロワー</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(isEmpty(user)){
            return <Loading />;
        } else if(user && isEmpty(followers)){
            return (
                followerList(<Loading />)
            );
        }

        const bindedUsers = followers.map((user, i) => (
            <SimpleUser user={user} key={i} />
        ));

        return (
            followerList(bindedUsers)
        );
    }
}

export const ConnectedFollowersView = connect(
    state => state,
)(FollowersView);
