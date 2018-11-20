import React, { Component } from "react";

export class Genres extends Component {
    render() {
        if(this.props.genres == []){
            return;
        }
        
        const genres = this.props.genres.map(( genre ) => (
            <li><a href="#">{genre.name}</a></li> 
        ));

        return (
            <div>
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        ジャンル一覧
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {genres}
                    </ul>
                </div>
            </div>
        );
    }
}

