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
                    本を読み終わった後、全体のレビューを書いてみましょう。
                    レビューには出来るだけネタバレを書かない様にしましょう。
                </p>
                <hr/>

                <p>
                </p>

                <div className="text-center">
                    <Link to="/tutorial/4" className="btn btn-success">次へ進む</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial03;

