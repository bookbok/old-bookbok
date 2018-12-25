import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {Object} user
 *   {id,name,avatar,description}を含むオブジェクトを渡す必要がある
 *
 * このコンポーネントを使用する場合、親要素に`position: relative`を適用する必要がある
 * 基本的に親要素には`.page-content-wrap`クラスを適応すると良い
 */
export class FloatUserInfo extends Component {
    render() {
        const user = this.props.user;

        return (
            <div className="sub-content card col-md-7">
                <div className="d-flex">
                    <div>
                        <Link to={`/users/${user.id}`} className="text-body">
                            <img src={user.avatar} className="user-info-avatar" />
                            <p className="h4 font-weight-bold">{user.name}</p>
                        </Link>
                    </div>

                    <div className="user-follow-info mt-2">
                        <Link to={`/users/${user.id}/followers`} className="m-2">0 フォロー</Link>
                        <Link to={`/users/${user.id}/followings`} className="m-2">test フォロワー</Link>
                    </div>
                </div>
                <button
                    onClick={this.handleClickFollow}
                    className="btn btn-primary user-follow-btn">
                    フォローする
                </button>

                <div className="user-info-accordion mt-2">
                    <label htmlFor="user-info-accordion-check" className="accordion-label text-center mt-2">
                        <i className="fas fa-angle-down"></i> 詳細を表示する
                    </label>
                    <input type="checkbox" id="user-info-accordion-check" className="user-info-accordion-check" />
                    <pre className="user-info-description mt-4 mb-0">
                        {user.description ? user.description : '未設定'}
                    </pre>
                </div>
            </div>
        );
    }
}

FloatUserInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
};
