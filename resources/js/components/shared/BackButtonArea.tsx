import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    to: string;
    text?: string;
}

class BackButtonArea extends React.Component<Props> {
    render() {
        return (
            <div className="back-button">
                <Link to={this.props.to}>
                    <i className="fas fa-angle-left" />
                    <p className="d-inline font-weight-bold">
                        &nbsp;{this.props.text ? this.props.text : '戻る'}
                    </p>
                </Link>
            </div>
        );
    }
}

export default BackButtonArea;
