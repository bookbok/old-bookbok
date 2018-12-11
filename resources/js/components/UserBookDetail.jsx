import React, { Component } from "react";
import { fetchUserBookDetail } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";

export class UserBookDetail extends Component {
    constructor(props){
        super(props);

        this.state = {};
    };

    componentDidMount(){
        const userId = parseInt(this.props.match.params.userId);
        const userBookId = parseInt(this.props.match.params.userBookId);
        store.dispatch(fetchUserBookDetail(userId, userBookId));
    };

    render(){
        const userBookDetail = this.props.userBookDetail;

        if(isEmpty(userBookDetail)){
            return <Loading />;
        }

        const boks = userBookDetail.map((bok, i) => {
            return <Bok />
        })

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    </div>
                </div>
            </div>
        );
    }
}

