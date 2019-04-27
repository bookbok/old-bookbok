import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial00 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    読書をもっと素敵にするサービス「BookBok」をご利用いただきありがとうございます。
                </p>
                <ul>
                    <li>このチュートリアルではBookBokのメイン機能を説明しています。</li>
                    <li>必ずしも全てのチュートリアルをやる必要はありません。</li>
                    <li>今後、フィードバックを元に変更される可能性があります。</li>
                </ul>
                <div className="text-center">
                    <Link to="/tutorial/1" className="btn btn-success">
                        開始
                    </Link>
                </div>
            </div>
        );
    }
}

export default Tutorial00;
