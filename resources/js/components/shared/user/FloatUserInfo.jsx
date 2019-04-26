import React, { Component } from 'react';
import { store } from '../../../store';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getAuthUser } from '../../../utils';
import { requestFollow, requestUnFollow, setAlertMessage } from '../../../actions';
import FollowButton from './FollowButton';
import DefaultAvatar from './DefaultAvatar';

/**
 * @param {Object} user
 *   FloatUserInfo_.propTypes.userを満たすオブジェクトを渡す必要がある
 *
 * このコンポーネントを使用する場合、親要素に`position: relative`を適用する必要がある
 * 基本的に親要素には`.page-content-wrap`クラスを適応すると良い
 */
export class FloatUserInfo_ extends Component {
    constructor(props) {
        super(props);

        this.state = { followed: this.props.user.is_following };
        this.handleClickFollow = this.handleClickFollow.bind(this);
    }

    // propsの値が変更された時に、stateのfollowedを変更する
    componentWillReceiveProps(nextProps) {
        this.setState({ followed: nextProps.user.is_following });
    }

    handleClickFollow() {
        const user = getAuthUser();
        if (!user) {
            store.dispatch(
                setAlertMessage('warning', {
                    __html: "<div><a href='/login'>ログイン</a>してください</div>",
                })
            );
            return;
        }

        if (this.state.followed) {
            requestUnFollow(user.id, this.props.user.id).then(() => {
                this.setState({ followed: !this.state.followed });
            });
        } else {
            requestFollow(user.id, this.props.user.id).then(() => {
                this.setState({ followed: !this.state.followed });
            });
        }
    }

    render() {
        const user = this.props.user;

        return (
            <div className="sub-content card">
                <div className="d-flex">
                    <div>
                        <Link to={`/users/{user.id}`} className="text-body">
                            {user.avatar ? (
                                <img src={user.avatar} className="user-info-avatar" />
                            ) : (
                                <DefaultAvatar className="user-info-avatar bg-bookbok" />
                            )}
                            <p className="h4 font-weight-bold">{user.name}</p>
                        </Link>
                    </div>

                    <div className="user-follow-info mt-2">
                        <Link to={`/users/${user.id}/followings`} className="m-2">
                            {user.following_count} フォロー
                        </Link>
                        <Link to={`/users/${user.id}/followers`} className="m-2">
                            {user.follower_count} フォロワー
                        </Link>
                    </div>
                </div>
                <FollowButton
                    userId={user.id}
                    followed={this.state.followed}
                    handleClickFollow={this.handleClickFollow}
                />

                <div className="user-info-accordion mt-2">
                    <label
                        htmlFor="user-info-accordion-check"
                        className="accordion-label text-center mt-2"
                    >
                        <i className="fas fa-angle-down" /> 詳細を表示する
                    </label>
                    <input
                        type="checkbox"
                        id="user-info-accordion-check"
                        className="user-info-accordion-check"
                    />
                    <pre className="user-info-description mt-4 mb-0">
                        {user.description ? user.description : '未設定'}
                    </pre>
                </div>
            </div>
        );
    }
}

FloatUserInfo_.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        description: PropTypes.string,
        follower_count: PropTypes.number.isRequired,
        following_count: PropTypes.number.isRequired,
        is_follower: PropTypes.bool.isRequired,
        is_following: PropTypes.bool.isRequired,
    }),
};

export const FloatUserInfo = withRouter(FloatUserInfo_);
