import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// 同じコンポーネントだとパス内のidが変わってもcomponentDidMountが呼ばれない
// そのためパスのidが変わったら再度API読み込みをする共通処理をDecoratorパターンで実装
export function fetchOnIdUpdateDecorator(updater) {
    return DecoratedComponent => {
        class FetchOnIdUpdateDecorator extends React.Component {
            componentWillReceiveProps(nextProps) {
                const params = this.props.match.params;
                const nextParams = nextProps.match.params;
                Object.keys(params).some(key => {
                    if (params[key] !== nextParams[key]) {
                        updater(nextParams);
                        return true;
                    }
                });
            }

            render() {
                return <DecoratedComponent {...this.props} />;
            }
        }

        FetchOnIdUpdateDecorator.propTypes = {
            match: PropTypes.shape({
                params: PropTypes.object,
            }),
        };

        return withRouter(FetchOnIdUpdateDecorator);
    };
}
