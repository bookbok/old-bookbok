import React, { Component } from 'react';
import RouterWithHeader from './RouterWithHeader';
import { store } from "../store";
import { AlertView } from "./AlertView";

export class App extends Component {
    render() {
        return (
            <div>
                <AlertView alertType="success" alertMessage="ねーむーいー"/>
                <RouterWithHeader />
            </div>
        );
    }
}
