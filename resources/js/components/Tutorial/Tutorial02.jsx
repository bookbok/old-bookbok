import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial02 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    BookBokではBokという、本を読んでいる間の呟きを投稿する仕組みがあります。
                </p>

                <div className="text-center">
                    <Link to="/tutorial/3" className="btn btn-success">次へ進む</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial02;

