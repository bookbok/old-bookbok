import * as React from 'react';
import PropTypes from 'prop-types';
import * as ResourceTypes from '../resource-types';
import { connect } from 'react-redux';
import { store } from '../store';
import { fetchUser, fetchFollowers, loading, loaded } from '../actions';
import { isEmpty } from '../utils';

import { Loading } from './shared/Loading';
import { MyPageTabs } from './shared/user/MyPageTabs';
import { FloatUserInfo } from './shared/user/FloatUserInfo';
import SimpleUser from './shared/user/SimpleUser';

interface Props {
    match: ResourceTypes.Matcher;
    user?: ResourceTypes.User;
    loading?: boolean;
    followers?: Array<ResourceTypes.SimpleUser>;
}

class FollowersView extends React.Component<Props> {
    componentDidMount() {
        const userId = this.props.match.params.id;
        store.dispatch(loading());
        Promise.all([fetchFollowers(userId), fetchUser(userId)]).then(() => {
            store.dispatch(loaded());
        });
    }

    render() {
        const followers = this.props.followers;
        const user = this.props.user;
        const followerList = view => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <MyPageTabs isFollowers userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>フォロワー</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (isEmpty(user)) {
            return <Loading />;
        } else if (this.props.loading || (user && !followers)) {
            return followerList(<Loading />);
        }

        // @ts-ignore
        const bindedUsers = followers.map((user, i) => <SimpleUser user={user} key={i} />);

        return followerList(bindedUsers);
    }
}

export default connect(state => state)(FollowersView);
