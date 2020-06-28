import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import { TutorialProps } from './TutorialProps';

const Tutorial03: React.FC<TutorialProps> = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>
                BookBokにはBokとは別にamazonレビューの様な仕組みも存在します。
                本を読み終わった後、全体のレビューを書いてみましょう。
                レビューには出来るだけネタバレを書かない様にしましょう。
            </p>
            <hr />

            <p>
                レビューを書くにはまず自分の本棚に移動する必要があります。
                画面右上のアカウント名をクリックし、表示される一覧の「プロフィール」からユーザーページに遷移できます。
                <ImageCard src="/images/tutorials/03-01.png" />
            </p>

            <p>
                その後、タブの本棚を選択すると自分の本棚が表示されます。
                <ImageCard src="/images/tutorials/03-02.png" />
            </p>

            <p>
                本棚に移動した後、自分の本棚からどれか本の画像を選択します。
                遷移した画面を下にスクロールし「レビューを投稿する」というボタンを選択します。
                <ImageCard src="/images/tutorials/03-03.png" />
            </p>

            <p>
                レビューの入力フォームが表示されます。
                タイトル、内容を入力できる様になっています。
                タイトルは任意入力で、入力しなかった場合「無題」と表示されます。
                <ImageCard src="/images/tutorials/03-04.png" />
            </p>

            <div className="text-center">
                <Link to="/tutorial/4" className="btn btn-success">
                    次へ進む
                </Link>
            </div>
        </div>
    );
}

export default Tutorial03;
