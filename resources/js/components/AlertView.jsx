import React from "react";
import PropTypes from 'prop-types';

// storeにAlertMessageがあるか確認し、alertType,alertMessageをセットする
class Alert extends React.Component {
    componentDidMount() {
        this.timer = setTimeout(
            this.props.onClose,
            this.props.timeout
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    getAlertClass(type) {
        switch(type){
            case "primary"  : return "alert-primary";   // skyblue
            case "secondary": return "alert-secondary"; // gray
            case "success"  : return "alert-success";   // green
            case "info"     : return "alert-info";      // blue-green
            case "warning"  : return "alert-warning";   // yellow
            case "danger"   : return "alert-danger";    // red
            case "light"    : return "alert-light";     // white
            case "dark"     : return "alert-dark";      // dark-gray
            default         : return "";
        }
    }

    render(){
        const message = this.props.message;
        const alertClass = `alert ${this.getAlertClass(message.alertType)} alert-dismissible fade show`;

        return (
            <div className={alertClass} role="alert">
                <div dangerouslySetInnerHTML={message.text} />
                <button type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="閉じる"
                    onClick={this.props.onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
         );
    }
}

Alert.propTypes = {
    onClose: PropTypes.func,
    timeout: PropTypes.number,
    message: PropTypes.object.isRequired,
};

Alert.defaultProps = {
    timeout: 3000,
};

export default Alert;
