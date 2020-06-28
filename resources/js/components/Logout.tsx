import * as React from 'react';
import * as ResourceTypes from '../resource-types';
import { requestLogout } from '../actions';
import { store } from '../store';

interface Props {
    history: ResourceTypes.Route;
}

export class Logout extends React.Component<Props> {
    componentDidMount() {
        store.dispatch(requestLogout(this.props.history));
    }

    // 実際ほぼ表示されないが、レスポンスが遅い場合表示されるかもしれない画面
    render() {
        return (
            <div>
                <p className="text-center">ログアウトしています......</p>
            </div>
        );
    }
}
