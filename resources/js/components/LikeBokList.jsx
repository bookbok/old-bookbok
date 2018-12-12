import React, { Component } from "react";
import { fetchLikeBoks } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { Bok } from "./Bok.jsx";

export class LikeBokList extends Component {
    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchLikeBoks(userId));
    };

    render(){
        const likeBoks = this.props.likeBoks;

        if(isEmpty(likeBoks)){
            return <Loading />;
        }

        const boks = likeBoks.map((likeBok, index) => {
            return <Bok bok={likeBok} key={index} />
        })

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <p>LikeBok一覧</p>
                        {boks}
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
