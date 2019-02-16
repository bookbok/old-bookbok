import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial01 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>BookBokではユーザー固有の本棚を持ちます。</p>
                <p>本の登録方法は2種類あります。</p>
                <ol>
                    <li>ISBNを入力して登録する方法</li>
                    <li>本の詳細画面から「本棚に登録」ボタンを押して登録する方法</li>
                </ol>

                <p>
                    1のISBNから登録する場合、本の裏表紙などに書かれている13桁(古い本では10桁の場合もある)のIDを入力することによって、自分の本棚へその本を追加することができます。
                    ISBNの入力は「本の一覧」ページにある「ISBNから本棚に登録」からできます。
                </p>

                <p>
                    2の本の詳細画面から「本棚に登録」ボタンを押して登録する場合、「本の一覧」ページで本を検索したり、誰かが書いたレビューやBokと呼ばれる感想などから本の詳細ページに飛ぶ必要があります。
                    一度誰かが本棚に登録した本は
                </p>

                <div className="text-center">
                    <Link to="/tutorial/2" className="btn btn-success">Bok投稿</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial01;
