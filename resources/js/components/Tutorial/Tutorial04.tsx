import * as React from 'react';
import ImageCard from './ImageCard';

interface Props {
    title: string;
}

const Tutorial04: React.FC<Props> = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
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

export default Tutorial04;
