import React, { Component } from "react";
import PropTypes from 'prop-types';

import { requestFollow } from '../../../actions';
import { getAuthUser } from '../../../utils';

export default class FollowButton extends Component {
    render() {
        // 自分
        if(getAuthUser() && getAuthUser().id == this.props.userId) {
            return (<button className="btn btn-primary" disabled>フォローする</button>);
        }

        if(this.props.followed) {
            return (
                <button
                    onClick={this.props.handleClickFollow}
                    className="btn btn-primary">
                    フォロー中
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.props.handleClickFollow}
                    className="btn btn-outline-primary">
                    フォローする
                </button>
            );
        }
    }
}

FollowButton.propTypes = {
    userId: PropTypes.number,
    followed: PropTypes.bool.isRequired,
    handleClickFollow: PropTypes.func.isRequired,
};
