import React, { Component } from "react";
import { requestLogout } from "../actions";
import { store } from "../store";

export class Logout extends Component {
    componentDidMount() {
        store.dispatch(requestLogout());
        this.props.history.push('/');
    }

    // 実際ほぼ表示されないが、レスポンスが遅い場合表示されるかもしれない画面
    render() {
        return (
            <div>
                <p class="text-center">ログアウトしています......</p>
            </div>
        );
    }
}
