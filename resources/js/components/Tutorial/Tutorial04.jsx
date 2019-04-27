import React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';

class Tutorial04 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    BookBokにはユーザーシステムがあります。
                    ユーザー名、アイコン、自己紹介を設定ページから設定することができます。
                </p>
                <hr />

                <p>
                    画面右上のアカウント名をクリックし、表示される一覧の「各種設定」からプロフィール設定ページに遷移できます。
                    <ImageCard src="/images/tutorials/04-01.png" />
                </p>

                <p>
                    各種ユーザー情報を編集できるフォームが表示されます。 自由に編集しましょう。
                    <ImageCard src="/images/tutorials/04-02.png" />
                </p>

                <p>以上でチュートリアルは終了です。 引き続き読書をお楽しみください。</p>
            </div>
        );
    }
}

export default Tutorial04;
