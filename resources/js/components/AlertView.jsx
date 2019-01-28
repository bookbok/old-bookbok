import React, { Component } from "react";
import { connect } from "react-redux";

// storeにAlertMessageがあるか確認し、alertType,alertMessageをセットする
class AlertView extends Component {
    render(){
        if(!this.props.alertView){
            return null;
        }

        let alertClass = "alert-dismissible fade show alert";
        switch(this.props.alertView.alertType){
            case "primary"  : alertClass += " alert-primary";   break;  // skyblue
            case "secondary": alertClass += " alert-secondary"; break;  // gray
            case "success"  : alertClass += " alert-success";   break;  // green
            case "info"     : alertClass += " alert-info";      break;  // blue-green
            case "warning"  : alertClass += " alert-warning";   break;  // yellow
            case "danger"   : alertClass += " alert-danger";    break;  // red
            case "light"    : alertClass += " alert-light";     break;  // white
            case "dark"     : alertClass += " alert-dark";      break;  // dark-gray
        }

        return (
            <div className={alertClass}>
                <div dangerouslySetInnerHTML={this.props.alertView.message} />
                <button type="button" className="close" data-dismiss="alert" aria-label="閉じる">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
         );
    }
}

export default connect(state => state)(AlertView);
