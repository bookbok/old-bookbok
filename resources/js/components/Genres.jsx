import React, { Component } from "react";

export class Genres extends Component {
    render() {
        if(this.props.genres == []){
            return;
        }

        console.log(this.props.genres);

        const genres = this.props.genres.map((v, i) => (
            <li key={i}>
                {v.name}
            </li>
        ));
        return (
            <div>
                <h1>ジャンル一覧</h1>
                <ul>{genres}</ul>
            </div>
        );
    }
}

