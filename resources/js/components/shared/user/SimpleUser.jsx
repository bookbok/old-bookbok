import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { requestFollow, requestUnFollow } from '../../../actions';
import { getAuthUser, isEmpty } from '../../../utils';
import FollowButton from './FollowButton';

class SimpleUser_ extends Component {
    constructor(props) {
        super(props);

        const is_following = this.props.user.is_following ? this.props.users.is_following : false;
        this.state = { followed: is_following };
        this.handleClickFollow = this.handleClickFollow.bind(this);
    }

    // propsの値が変更された時に、stateのfollowedを変更する
    componentWillReceiveProps(nextProps) {
        const is_following = nextProps.user.is_following ? nextProps.users.is_following : false;
        this.setState({ followed: is_following });
    }

    handleClickFollow() {
        const user = getAuthUser();
        if(isEmpty(user)) {
            console.log('ログインが必要です');
            return this.props.history.push('/login');
        }

        if(this.state.followed) {
            requestUnFollow(user.id, this.props.user.id).then(() => {
                this.setState({ followed: !this.state.followed });
            })
        } else {
            requestFollow(user.id, this.props.user.id).then(() => {
                this.setState({ followed: !this.state.followed });
            });
        }
    }

    render() {
        const user = this.props.user;
        // ユーザー一覧画面とフォロワー一覧などの両方でフォローボタンの表示を分岐したいため
        const followBtn = user.is_follower == null || user.is_following == null ? (
            <div/>
        ) : (
            <div className="ml-auto">
                <FollowButton followed={this.state.followed} handleClickFollow={this.handleClickFollow} />
            </div>
        );

        return (
            <div className="card">
                <div className="card-body d-flex">
                    <img src={user.avatar} height="40" />
                    <div className="ml-2">
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        <div className="small text-muted">
                            {user.created_at}
                        </div>
                    </div>
                    {followBtn}
                </div>
            </div>
        );
    }
}

SimpleUser_.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        follower_count: PropTypes.number,
        following_count: PropTypes.number,
        is_follower: PropTypes.bool,
        is_following: PropTypes.bool,
    })
};

const SimpleUser = withRouter(SimpleUser_);
export default SimpleUser;