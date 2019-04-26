import React from 'react';
import { PropTypes } from 'prop-types';
import * as ResourceTypes from '../../resource-types';
import { Bok } from '../Bok';

class BokFlowContent extends React.Component {
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

BokFlowContent.propTypes = {
    bokFlow: PropTypes.arrayOf(ResourceTypes.BOK).isRequired,
    currentUser: ResourceTypes.CURRENT_USER.isRequired,
};

export default BokFlowContent;
