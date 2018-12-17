import React, { Component } from "react";
import { fetchBokFlow } from "../actions";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { Bok } from "./Bok.jsx";

export class BokFlow extends Component {
    componentDidMount() {
        store.dispatch(fetchBokFlow());
    };

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
            return <div className="mt-2" key={i}><Bok bok={bok}/></div>
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
