import React, { Component } from "react";
import { fetchGenres } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils";

export class Genres extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        store.dispatch(fetchGenres());
    };

    render() {
        if(isEmpty(this.props.genres)){
            return <div></div>;
        }

        const genres = this.props.genres.map(( genre ) => (
            <li><a href="#">{genre.name}</a></li>
        ));

        return (
            <div>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        ジャンル一覧
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {genres}
                    </ul>
                </div>
            </div>
        );
    }
}

