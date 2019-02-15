import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial01 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div className="text-center">
                    <Link to="/tutorial/2" className="btn btn-success">Bok投稿</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial01;
