import React, { Component } from "react";
import { fetchLikeBoks, fetchUser } from "../actions";
import { store } from "../store";
import { isEmpty } from "../utils";

import { Loading } from "./shared/Loading";
import { Bok } from "./Bok";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

export class LikeBokList extends Component {
    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchLikeBoks(userId));
        store.dispatch(fetchUser(userId));
    };

    render(){
        const likeBoks = this.props.likeBoks;
        const user = this.props.user;
        const likeList = (view) => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isLikes userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>LikeしたBok</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(isEmpty(user)){
            return <Loading />;
        } else if(user && isEmpty(likeBoks)){
            return (
                likeList(<Loading />)
            );
        }

        const boks = likeBoks.map((likeBok, index) => {
            return <Bok bok={likeBok} key={index} />
        })

        return (
            likeList(boks)
        );
    }
}
