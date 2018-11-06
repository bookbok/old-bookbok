import React, { Component } from 'react';
import { ConnectedTimeLine } from "../containers";
import { MenuRouter } from './Header.jsx';

export class App extends Component {
    render() {
        return (
            <div>
                <MenuRouter />
                <ConnectedTimeLine />
            </div>
        );
    }
}
