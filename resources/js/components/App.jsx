import React, { Component } from 'react';
import { ConnectedTimeLine } from "../containers";

export class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <ConnectedTimeLine />
            </div>
        );
    }
}
