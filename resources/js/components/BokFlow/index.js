import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { store } from "../../store";
import { fetchBokFlow, setAlertMessage } from "../../actions";
import { isEmpty, getAuthUser } from "../../utils";

import { Loading } from "../shared/Loading";
import BokFlowContent from "./BokFlowContent";

class BokFlow extends React.Component {
    componentDidMount() {
        if(!getAuthUser()){
            console.log("BokFlow : componentDidMount()");
            return store.dispatch(setAlertMessage("warning", {__html: "<Link to='/login'>ログイン</Link>してください"}));
        }
        store.dispatch(fetchBokFlow());
    }

    render() {
        if(isEmpty(this.props.bokFlow)){
            return <Loading />;
        }

        const currentUser = getAuthUser();
        return (
            <BokFlowContent currentUser={currentUser} bokFlow={this.props.bokFlow} />
        );
    }
}

export default withRouter(
    connect(state => state)(BokFlow)
);
