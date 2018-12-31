import React, { Component } from "react";
import { fetchGenres } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils";
import { Link } from 'react-router-dom';

export class Genres extends Component {
    componentDidMount(){
        store.dispatch(fetchGenres());
    };

    render() {
        if(isEmpty(this.props.genres)){
            return <div></div>;
        }

        const genres = this.props.genres.map((genre) => (
            <li key={genre.id}><Link to="#" className="text-body">{genre.name}</Link></li>
        ));

        return (
            <div className="dropdown border">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    ジャンル一覧
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {genres}
                </ul>
            </div>
        );
    }
}

