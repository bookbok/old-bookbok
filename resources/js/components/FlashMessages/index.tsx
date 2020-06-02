import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import { deleteAlertMessage } from '../../actions';
import Alert from './Alert';

interface Props {
    alertView?: {
        message: string;
        alertType: string;
    };
}

class FlashMessages extends React.Component<Props> {
    removeMessage() {
        store.dispatch(deleteAlertMessage());
    }

    render() {
        if (!this.props.alertView) {
            return <div />;
        }

        const { message, alertType } = this.props.alertView;
        return (
            <div className="flash-toast-group">
                <Alert
                    message={{ text: message, alertType }}
                    onClose={() => this.removeMessage()}
                />
            </div>
        );
    }
}

export default connect(state => state)(FlashMessages);
