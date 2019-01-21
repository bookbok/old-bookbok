import React from "react";
import { Bok } from "../Bok";

class BokFlowContent extends React.Component {
    render() {
        const { bokFlow, currentUser } = this.props;
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <p className="pl-5 pr-5">
                        {currentUser.name}さんがフォローしているユーザーの最新Bokを表示しています。
                    </p>
                    <div className="col-md-8 main-content p-5">
                        {typeof bokFlow === 'string' ?
                            bokFlow :
                            bokFlow.map(bok => (
                                <div className="mt-2" key={bok.id}><Bok bok={bok}/></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BokFlowContent;
