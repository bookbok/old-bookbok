import React, { Component } from 'react';
import { ConnectedTimeLine } from "../containers";
import { Header,MenuRouter} from "./Header.jsx";

export class App extends Component {
    render() {
        return (
            <div>
		<MenuRouter />		
                <h1>Hello, world!</h1>
                <ConnectedTimeLine />
            </div>
        );
    }
}
