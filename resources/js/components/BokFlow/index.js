import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { store } from "../../store";
import { fetchBokFlow, setAlertMessage, deleteAlertMessage } from "../../actions";
import { isEmpty, getAuthUser } from "../../utils";

import { Loading } from "../shared/Loading";
import BokFlowContent from "./BokFlowContent";

class BokFlow extends React.Component {
    componentDidMount() {
        if(!getAuthUser()){ return this.props.history.push("/login"); }
        store.dispatch(fetchBokFlow());
    }

    componentWillUnmount() {
        store.dispatch(deleteAlertMessage());
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
