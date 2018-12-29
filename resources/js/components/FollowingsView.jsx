import React, { Component } from "react";
import { connect } from "react-redux";

import { Loading } from "./shared/Loading";

class FollowingsView extends Component {
    render() {
        return (
            <div>followings</div>
        );
    }
}

export const ConnectedFollowingsView = connect(
    state => state,
)(FollowingsView);

