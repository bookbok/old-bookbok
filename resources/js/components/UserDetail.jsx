import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ResourceTypes from '../resource-types';
import { store } from '../store';
import { fetchUser, loading, loaded } from '../actions';
import * as utils from '../utils';

import { Loading } from './shared/Loading';
import { MyPageTabs } from './shared/user/MyPageTabs';
import { FloatUserInfo } from './shared/user/FloatUserInfo';

const fetchUserDetailActions = userId => {
    store.dispatch(loading());
    Promise.all([fetchUser(userId)]).then(() => {
        store.dispatch(loaded());
    });
};

//マイページ画面を表すコンポーネントを定義
class UserDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            avatar: '',
            description: '',
        };
    }

    componentDidMount() {
        fetchUserDetailActions(this.props.match.params.id);
    }

    render() {
        const user = this.props.user;
        if (this.props.loading || !user) {
            return <Loading />;
        }

        return (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <MyPageTabs isTop userId={this.props.match.params.id} />
                            <div className="mt-4 user-detail-wrapper">
                                <div className="d-flex">
                                    <img src={user.avatar} className="user-info-avatar d-block" />
                                    <h3 className="m-0 ml-2 d-flex align-items-center">
                                        {user.name}
                                    </h3>
                                </div>
                                <p className="text-muted">
                                    {utils.makeDateJP(user.created_at)}に登録された読書家です
                                </p>
                                <p className="mt-3">{user.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserDetail.propTypes = {
    match: ResourceTypes.MATCHER,
    user: ResourceTypes.USER,
    loading: PropTypes.bool,
};

// URL内のid変更を検知して、再度ユーザー情報をfetchするためのデコレーター
import { connect } from 'react-redux';
import { fetchOnIdUpdateDecorator } from '../decorators/FetchOnIdUpdateDecorator';

export default connect(state => state)(
    fetchOnIdUpdateDecorator(({ id }) => {
        fetchUserDetailActions(id);
    })(UserDetail)
);
