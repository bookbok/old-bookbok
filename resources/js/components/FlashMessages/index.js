import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { store } from "../store";
import { deleteAlertMessage } from "../actions";

class FlashMessages extends React.Component {
    removeMessage() {
        store.dispatch(deleteAlertMessage());
    }

    render() {
        if(!this.props.alertView) {
            return <div/>;
        }

        const { message as text, alertType } = this.props.alertView;
        return (
            <Alert message={ {text, alertType} } onClose={ () => this.removeMessage() }/>
        );
    }
}

FlashMessages.propTypes = {
    alertView: PropTypes.object.isRequired,
};

export default connect(state => state)(FlashMessages);
