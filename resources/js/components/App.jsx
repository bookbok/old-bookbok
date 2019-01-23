import React, { Component } from 'react';
import RouterWithHeader from './RouterWithHeader';
import { store } from "../store";
import AlertView from "./AlertView";

export class App extends Component {
    render() {
        // storeにAlertMessageがあるか確認し、alertType,alertMessageをセットする
        return (
            <div>
                <AlertView />
                <RouterWithHeader />
            </div>
        );
    }
}
