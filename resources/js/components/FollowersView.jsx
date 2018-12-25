import React, { Component } from "react";

import { Loading } from "./shared/Loading";

class FollowersView extends Component {
    render() {
        return (
            <div>followers</div>
        );
    }
}

export const ConnectedFollowersView = connect(
    state => state,
)(FollowersView);
