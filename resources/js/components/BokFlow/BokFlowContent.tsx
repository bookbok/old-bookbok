import * as React from 'react';
import * as ResourceTypes from '../../resource-types';
import { Bok } from '../Bok';

interface Props {
    bokFlow: Array<ResourceTypes.Bok>;
    currentUser: ResourceTypes.CurrentUser;
}

class BokFlowContent extends React.Component<Props> {
    render() {
        const { bokFlow, currentUser } = this.props;
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <p className="pl-5 pr-5">
                        {currentUser.name}さんがフォローしているユーザーの最新Bokを表示しています。
                    </p>
                    <div className="col-md-8 bok-flow-wrapper">
                        {typeof bokFlow === 'string'
                            ? bokFlow
                            : bokFlow.map(bok => (
                                  <div className="mt-2" key={bok.id}>
                                      <Bok bok={bok} />
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default BokFlowContent;
