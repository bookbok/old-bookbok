import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { store } from "../store";

export class AlertView extends Component {
    render(){
        let alertClass = "alert-dismissible fade show alert";
        switch(this.props.alertType){
            case "primary"      : alertClass += " alert-primary";   break;  // skyblue
            case "secondary"    : alertClass += " alert-secondary"; break;  // gray
            case "success"      : alertClass += " alert-success";   break;  // green
            case "info"         : alertClass += " alert-info";      break;  // blue-green
            case "warning"      : alertClass += " alert-warning";   break;  // yellow
            case "danger"       : alertClass += " alert-danger";    break;  // red
            case "light"        : alertClass += " alert-light";     break;  // white
            case "dark"         : alertClass += " alert-dark";      break;  // dark-gray
        }

        return (
            <div className={alertClass}>
                {this.props.alertMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="閉じる">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
         );
    }
}
