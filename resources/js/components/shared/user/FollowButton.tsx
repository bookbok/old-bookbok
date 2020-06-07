import * as React from 'react';

import { getAuthUser } from '../../../utils';

interface Props {
    userId?: number;
    followed: boolean;
    handleClickFollow: any;
}

export default class FollowButton extends React.Component<Props> {
    render() {
        // 自分
        if (getAuthUser() && getAuthUser().id == this.props.userId) {
            return null;
        }

        if (this.props.followed) {
            return (
                <button onClick={this.props.handleClickFollow} className="btn btn-primary">
                    フォロー中
                </button>
            );
        } else {
            return (
                <button onClick={this.props.handleClickFollow} className="btn btn-outline-primary">
                    フォローする
                </button>
            );
        }
    }
}
