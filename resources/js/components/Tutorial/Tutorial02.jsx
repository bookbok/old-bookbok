import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial02 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p></p>
                <ol className="ml-4">
                    <li>方法</li>
                </ol>
                <hr/>

                <ol>
                    <li className="mb-5">
                    </li>
                </ol>

                <div className="text-center">
                    <Link to="/tutorial/3" className="btn btn-success">次へ進む</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial02;

