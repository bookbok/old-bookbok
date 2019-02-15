import React from 'react';
import { Link } from 'react-router-dom';

class TutorialFrame extends React.Component {
    constructor(props) {
        super(props);
        this.tutorialTexts = [
            'チュートリアル開始',
            '本の登録',
            'Bokを投稿',
            'レビューを投稿',
            'ユーザー情報の編集',
        ];
    }

    render() {
        return (
            <div className="page-content-wrap ">
                <div className="list-group sub-content">
                    {this.tutorialTexts.map((text, i) => (
                        <Link to={`/tutorial/${i}`}
                            className={`list-group-item list-group-item-action ${this.props.tutorialID == i && 'active'}`}
                            key={i}>
                            {text}
                        </Link>
                    ))}
                </div>

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Tutorial extends React.Component {
    render() {
        const tutorialID = this.props.match.params.id;

        // 基本構造であるページメニューやメインコンテツの入れ物を作成する
        // 子要素にチュートリアルの種類ごとコンテンツを渡す形
        const page = <TutorialFrame tutorialID={tutorialID}>
            {(() => {
                if(tutorialID == 1) return null;
            })()}
        </TutorialFrame>

        return page;
    }
}

export default Tutorial;
