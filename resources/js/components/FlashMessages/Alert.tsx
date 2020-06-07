import * as React from 'react';

interface Props {
    onClose?: any;
    timeout?: number;
    message: {
        alertType: string;
        text: any;
    };
}

// storeにAlertMessageがあるか確認し、alertType,alertMessageをセットする
class Alert extends React.Component<Props> {
    private timer?: number;

    static defaultProps = {
        timeout: 5000
    }

    componentDidMount() {
        this.timer = setTimeout(this.props.onClose, this.props.timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    getAlertClass(type) {
        switch (type) {
            case 'primary': // skyblue
            case 'secondary': // gray
            case 'success': // green
            case 'info': // blue-green
            case 'warning': // yellow
            case 'danger': // red
            case 'light': // white
            case 'dark': // dark-gray
                return `alert-${type}`;
            default:
                return '';
        }
    }

    render() {
        const message = this.props.message;
        const alertClass = `alert ${this.getAlertClass(
            message.alertType
        )} alert-dismissible fade show flash-toast`;

        return (
            <div className={alertClass} role="alert">
                <div dangerouslySetInnerHTML={message.text} />
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="閉じる"
                    onClick={this.props.onClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default Alert;
