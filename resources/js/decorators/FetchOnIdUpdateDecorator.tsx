import * as React from 'react';
import * as ResourceTypes from '../resource-types';
import { withRouter } from 'react-router-dom';

interface Props {
    match: ResourceTypes.Matcher;
}

// 同じコンポーネントだとパス内のidが変わってもcomponentDidMountが呼ばれない
// そのためパスのidが変わったら再度API読み込みをする共通処理をDecoratorパターンで実装
export function fetchOnIdUpdateDecorator(updater) {
    return DecoratedComponent => {
        class FetchOnIdUpdateDecorator extends React.Component<Props> {
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

        return withRouter(FetchOnIdUpdateDecorator);
    };
}
