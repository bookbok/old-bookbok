import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import { TutorialProps } from './TutorialProps';

const Tutorial01: React.FC<TutorialProps> = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>BookBokではユーザー固有の本棚を持ちます。</p>
            <p>本の登録方法は2種類あります。</p>
            <ol className="ml-4">
                <li>ISBNを入力して登録する方法</li>
                <li>本の詳細画面から「本棚に登録」ボタンを押して登録する方法</li>
                <li>複数のISBNから一括登録する方法</li>
            </ol>
            <hr />

            <ol>
                <li className="mb-5">
                    <p>
                        ISBNから登録する場合、本の裏表紙などに書かれている13桁(古い本では10桁の場合もある)のIDを入力することによって、自分の本棚へその本を追加することができます。
                        <ImageCard src="/images/tutorials/01-02.png" />
                    </p>

                    <p>
                        ISBNの入力は「本の一覧」ページにある「ISBNから本棚に登録」からできます。
                        <ImageCard src="/images/tutorials/01-01.png" />
                    </p>
                </li>

                <li className="mb-5">
                    <p>
                        本の詳細画面から「本棚に登録」ボタンを押して登録する場合、「本の一覧」ページで本を検索したり、誰かが書いたレビューやBokと呼ばれる感想などから本の詳細ページに飛ぶ必要があります。
                        しかしこの方法は、一度誰かが本棚に登録した本でないとできません。
                        誰も登録していない本の場合、「1」のISBNから登録する方法が必要です。
                        <ImageCard src="/images/tutorials/01-03.png" />
                    </p>
                </li>

                <li className="mb-5">
                    <p>
                        複数のISBNから一括登録する場合、ISBNを改行区切りで入力することで複数の本を一括登録することができます。
                        <ImageCard src="/images/tutorials/01-04.png" />
                    </p>

                    <p>
                        「まとめて登録」ページはログイン時のみ表示される画面右上のアカウント名をクリックし、表示される一覧の「本棚の一括登録」から遷移できます。
                        <ImageCard src="/images/tutorials/01-05.png" />
                    </p>
                </li>
            </ol>

            <div className="text-center">
                <Link to="/tutorial/2" className="btn btn-success">
                    次へ進む
                </Link>
            </div>
        </div>
    );
}

export default Tutorial01;
