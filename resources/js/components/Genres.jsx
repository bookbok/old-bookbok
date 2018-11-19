import React, { Component } from "react";

export class Genres extends Component {
    render() {
        if(this.props.genres == []){
            return;
        }
        
        const genres = this.props.genres.map( x => x.name );

        return (
            <div>
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        ジャンル一覧
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="#">{genres[0]}</a></li>
                        <li><a href="#">{genres[1]}</a></li>
                        <li><a href="#">{genres[2]}</a></li>
                        <li><a href="#">{genres[3]}</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

