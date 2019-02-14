import React from 'react';

class TutorialFrame extends React.Component {
    render() {
        return (
            <div className="page-content-wrap row">

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <div>
                                {this.props.children}
                            </div>
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
        const page = <TutorialFrame>
            {(() => {
                if(tutorialID == 1) return null;
            })()}
        </TutorialFrame>

        return page;
    }
}

export default Tutorial;
