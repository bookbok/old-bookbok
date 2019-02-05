import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { store } from "../../store";
import { deleteAlertMessage } from "../../actions";
import Alert from './Alert';

class FlashMessages extends React.Component {
    removeMessage() {
        store.dispatch(deleteAlertMessage());
    }

    render() {
        if(!this.props.alertView) {
            return <div/>;
        }

        const { message, alertType } = this.props.alertView;
        return (
            <Alert message={ {text: message, alertType} } onClose={ () => this.removeMessage() }/>
        );
    }
}

FlashMessages.propTypes = {
    alertView: PropTypes.object,
};

export default connect(state => state)(FlashMessages);
