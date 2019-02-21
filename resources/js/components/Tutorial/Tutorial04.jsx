import React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';


class Tutorial04 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p className="mt-4 text-center">
                    作成途中
                </p>
            </div>
        );
    }
}

export default Tutorial04;

