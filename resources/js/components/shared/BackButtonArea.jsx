import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

class BackButtonArea extends Component {
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

BackButtonArea.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string,
};

export default BackButtonArea;
