import React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';

class Tutorial02 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    BookBokではBokという、本を読んでいる間の呟きを投稿する仕組みがあります。
                    BookBokは呟き感覚で感じたこと、考えたことを記録することができます。
                    また、通常のSNSなどとは異なり、特定の本についての呟きを残すことができます。
                    これをBookBokではBok(ボック)と呼びます。このボックはひとつのページで管理されているので自分自身の感じたことや考えたことの足跡を一目で振り返ることができます。
                </p>
                <hr />

                <p>
                    Bokを書くにはまず自分の本棚に移動する必要があります。
                    画面右上のアカウント名をクリックし、表示される一覧の「プロフィール」からユーザーページに遷移できます。
                    <ImageCard src="/images/tutorials/02-01.png" />
                </p>

                <p>
                    その後、タブの本棚を選択すると自分の本棚が表示されます。
                    <ImageCard src="/images/tutorials/02-02.png" />
                </p>

                <p>
                    本棚に移動した後、自分の本棚からどれか本の画像を選択します。
                    遷移した画面を下にスクロールし「Bok」というボタンを選択します。
                    <ImageCard src="/images/tutorials/02-03.png" />
                </p>

                <p>
                    Bokの入力フォームが表示されます。
                    開始ページ、終了ページ、該当行番号、内容を入力できる様になっています。
                    内容以外は全て任意入力なので、自分にあった粒度でBokを入力してください。
                    <br />
                    <small className="text-muted">
                        ※Bokは開始ページの昇順に並べた後、作成日の昇順で並べられます。
                    </small>
                    <ImageCard src="/images/tutorials/02-04.png" />
                </p>

                <div className="text-center">
                    <Link to="/tutorial/3" className="btn btn-success">
                        次へ進む
                    </Link>
                </div>
            </div>
        );
    }
}

export default Tutorial02;
