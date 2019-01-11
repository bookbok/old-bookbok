import React, { Component } from "react";
import PropTypes from 'prop-types';

import { requestFollow } from '../../../actions';
import { getAuthUser } from '../../../utils';

export default class FollowButton extends Component {
    render() {
        // 自分
        if(getAuthUser() && getAuthUser().id == this.props.userId) {
            return (<button className="btn btn-primary user-follow-btn" disabled>フォローする</button>);
        }

        if(this.props.followed) {
            return (
                <button
                    onClick={this.props.handleClickFollow}
                    className="btn btn-primary user-follow-btn">
                    フォロー中
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.props.handleClickFollow}
                    className="btn btn-outline-primary user-follow-btn">
                    フォローする
                </button>
            );
        }
    }
}

FollowButton.propTypes = {
    followed: PropTypes.bool.isRequired,
    handleClickFollow: PropTypes.func.isRequired,
};
