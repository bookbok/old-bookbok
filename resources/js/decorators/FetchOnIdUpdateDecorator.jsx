import React from 'react';
import { withRouter } from "react-router-dom";

// 同じコンポーネントだとパス内のidが変わってもcomponentDidMountが呼ばれない
// そのためパスのidが変わったら再度API読み込みをする共通処理をDecoratorパターンで実装
export function fetchOnIdUpdateDecorator(updater) {
    return (DecoratedComponent) => withRouter(
        class FetchOnIdUpdateDecorator extends React.Component {
            componentWillReceiveProps(nextProps) {
                const nextId = nextProps.match.params.id;
                if (nextId !== this.props.match.params.id) {
                    updater(nextId);
                }
            }

            render() {
                return <DecoratedComponent {...this.props} />;
            }
        }
    )
}


