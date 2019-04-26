import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ResourceTypes from '../resource-types';
import { fetchLoveBoks, fetchUser, loading, loaded } from '../actions';
import { store } from '../store';
import { isEmpty } from '../utils';

import { Loading } from './shared/Loading';
import { Bok } from './Bok';
import { MyPageTabs } from './shared/user/MyPageTabs';
import { FloatUserInfo } from './shared/user/FloatUserInfo';

const fetchLoveBokListActions = userId => {
    store.dispatch(loading());
    Promise.all([fetchLoveBoks(userId), fetchUser(userId)]).then(() => {
        store.dispatch(loaded());
    });
};

class LoveBokList extends Component {
    componentDidMount() {
        const userId = this.props.match.params.id;
        fetchLoveBokListActions(userId);
    }

    render() {
        const loveBoks = this.props.loveBoks;
        const user = this.props.user;
        const loveList = view => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 p-4 p-md-5">
                            <MyPageTabs isLoves userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>ブックマークしたBok</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (isEmpty(user)) {
            return <Loading />;
        } else if (this.props.loading || (user && !loveBoks)) {
            return loveList(<Loading />);
        }

        const boks = loveBoks.map((loveBok, index) => {
            return <Bok bok={loveBok} key={index} />;
        });

        return loveList(boks);
    }
}

LoveBokList.propTypes = {
    match: ResourceTypes.MATCHER,
    user: ResourceTypes.USER,
    loading: PropTypes.bool,
    loveBoks: PropTypes.arrayOf(ResourceTypes.BOK),
};

import { connect } from 'react-redux';
export default connect(state => state)(LoveBokList);
