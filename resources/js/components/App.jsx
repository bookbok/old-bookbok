import React, { Component } from 'react';
import RouterWithHeader from './RouterWithHeader';

export class App extends Component {
    constructor(props){
        super(props);

        this.alertView = this.alertView.bind(this);
    }

    alertView(type, message){
        let alertClass = "alert";

        switch(type){
            case "primary"      : alertClass += " alert-primary";   break;  // skyblue
            case "secondary"    : alertClass += " alert-secondary"; break;  // gray
            case "success"      : alertClass += " alert-success";   break;  // green
            case "info"         : alertClass += " alert-info";      break;  // blue-green
            case "warning"      : alertClass += " alert-warning";   break;  // yellow
            case "danger"       : alertClass += " alert-danger";    break;  // red
            case "light"        : alertClass += " alert-light";     break;  // white
            case "dark"         : alertClass += " alert-dark";      break;  // dark-gray
        }

        return <div className={alertClass}>{message}</div>
    }

    render() {
        const alertMessage = "Alert test";

        return (
            <div>
                {this.alertView("success" , "alert test : success")}
                <RouterWithHeader />
            </div>
        );
    }
}
