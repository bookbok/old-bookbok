import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../store";

class DialogView extends Component {

    props: {
        openFlag: boolean;
        title: string;
        message: string;
        okClickHandler: Function;
    };

    closeDialog() {
        {/* ダイアログを閉じる処理 */}
        console.log("ダイアログを閉じる");
    }

    renderDialogButtons(): React.Element<*> {
        return (
            <div>
                <RaisedButton label="キャンセル" onClick={closeDialog()} />
                <RaisedButton label="OK" onClick={this.props.onClickHandler} />
            </div>
        );
    }

    render(){
        if(!this.props.dialogView){
            return null;
        }

        return (
            <Dialog
                title={this.props.title}
                open={this.props.openFlag}
                actions={this.renderDialogButtons()}
            >
                {this.props.message}
            </Dialog>
         );
    }
}

export default connect(state => state)(DialogView);
