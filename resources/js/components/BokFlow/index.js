import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { store } from "../../store";
import { fetchBokFlow } from "../../actions";
import { isEmpty, getAuthUser } from "../../utils";
import { Loading } from "../shared/Loading";
import { Bok } from "../Bok.jsx";

export class BokFlow extends React.Component {
    componentDidMount() {
        if(!getAuthUser()) return this.props.history.push('/login');

        store.dispatch(fetchBokFlow());
    }

    render() {
        if(isEmpty(this.props.bokFlow)){
            return <Loading />;
        } else if(typeof this.props.bokFlow === 'string') {
            return (
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <div>{this.props.bokFlow}</div>
                        </div>
                    </div>
                </div>
            );
        }

        const bokFlow = this.props.bokFlow.map(bok => {
            return <div className="mt-2" key={bok.id}><Bok bok={bok}/></div>
        });

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 main-content p-5">
                        {bokFlow}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(state => state)(BokFlow));
