import React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';


class Tutorial03 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    BookBokにはBokとは別にamazonレビューの様な仕組みも存在します。
                </p>
                <hr/>

                <div className="text-center">
                    <Link to="/tutorial/4" className="btn btn-success">次へ進む</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial02;


