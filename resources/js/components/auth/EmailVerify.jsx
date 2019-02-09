import React from 'react';
import { withRouter } from 'react-router-dom';
import { Loading } from '../shared/Loading';
import { getQueryParam, wrapFetch } from '../../utils';

export const verifyEmail = (href) => {
    const url = getQueryParam('url', href);
    console.log(url);
    return wrapFetch(url, {
        isParse: false,
    });
};

class EmailVerify extends React.Component {
    componentDidMount() {
        verifyEmail(location.href).then(() => {
            this.props.history.push('/login');
        });
    }

    render() {
        return (
            <Loading />
        );
    }
}

export default withRouter(EmailVerify);
