import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import * as ResourceTypes from '../../resource-types';
import { store } from '../../store';
import { fetchBokFlow } from '../../actions';
import { isEmpty, getAuthUser } from '../../utils';

import { Loading } from '../shared/Loading';
import BokFlowContent from './BokFlowContent';

class BokFlow extends React.Component {
    componentDidMount() {
        if (!getAuthUser()) {
            return this.props.history.push('/login');
        }
        store.dispatch(fetchBokFlow());
    }

    render() {
        if (isEmpty(this.props.bokFlow)) {
            return <Loading />;
        }

        const currentUser = getAuthUser();
        return <BokFlowContent currentUser={currentUser} bokFlow={this.props.bokFlow} />;
    }
}

BokFlow.propTypes = {
    history: ResourceTypes.ROUTER,
    bokFlow: PropTypes.arrayOf(ResourceTypes.BOK),
};

export default withRouter(connect(state => state)(BokFlow));
