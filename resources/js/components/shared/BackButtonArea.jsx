import React, { Component } from "react";
import { Link } from 'react-router-dom';

class BackButtonArea extends Component {
    render() {
        return (
            <div className="back-button">
                <Link to={this.props.to}>
                    <i className="fas fa-angle-left"/>
                    <p className="d-inline font-weight-bold"> 戻る</p>
                </Link>
            </div>
        );
    }
}

export default BackButtonArea;
