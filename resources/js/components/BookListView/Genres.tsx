import * as React from 'react';
import * as ResourceTypes from '../../resource-types';
import { isEmpty } from '../../utils';
import { Link } from 'react-router-dom';

interface Props {
    genres?: Array<ResourceTypes.Genre>;
    handleClickSearchGenre: any;
    activeGenreId?: number | string;
}

class Genres extends React.Component<Props> {
    render() {
        if (isEmpty(this.props.genres)) {
            return <div />;
        }

        const genres = this.props.genres.map(genre => (
            <Link
                to="#"
                onClick={() => this.props.handleClickSearchGenre(genre.id)}
                className="dropdown-item"
                key={genre.id}
            >
                {genre.name}
            </Link>
        ));

        const genreOrUndef = this.props.genres.find(item => this.props.activeGenreId === item.id);
        return (
            <div className="dropdown border">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {genreOrUndef ? genreOrUndef.name : 'ジャンル一覧'}
                    <span className="caret" />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {genres}
                </div>
            </div>
        );
    }
}

export default Genres;
