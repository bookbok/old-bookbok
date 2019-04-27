import React from 'react';
import * as ResourceTypes from '../../resource-types';
import { Link } from 'react-router-dom';

import Tutorial00 from './Tutorial00';
import Tutorial01 from './Tutorial01';
import Tutorial02 from './Tutorial02';
import Tutorial03 from './Tutorial03';
import Tutorial04 from './Tutorial04';

class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.tutorials = [
            { component: Tutorial00, title: 'チュートリアルを始めましょう' },
            { component: Tutorial01, title: '本を登録しましょう' },
            { component: Tutorial02, title: 'Bokを投稿しましょう' },
            { component: Tutorial03, title: 'レビューを投稿しましょう' },
            { component: Tutorial04, title: 'ユーザー情報を編集しましょう' },
        ];
    }

    render() {
        const tutorialID = parseInt(this.props.match.params.id);

        // 基本構造であるページメニューやメインコンテツの入れ物を作成する
        // 子要素にチュートリアルの種類ごとコンテンツを渡す形
        return (
            <div className="page-content-wrap ">
                <div className="list-group sub-content">
                    {this.tutorials.map((tutorial, i) => (
                        <Link
                            to={`/tutorial/${i}`}
                            className={`list-group-item list-group-item-action ${tutorialID === i &&
                                'active'}`}
                            key={i}
                        >
                            {tutorial.title}
                        </Link>
                    ))}
                </div>

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            {(() => {
                                const TutorialContent = this.tutorials[tutorialID];
                                if (!TutorialContent || !TutorialContent.component) return null;

                                return (
                                    <TutorialContent.component
                                        title={this.tutorials[tutorialID].title}
                                    />
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Tutorial.propTypes = {
    match: ResourceTypes.MATCHER,
};

export default Tutorial;
