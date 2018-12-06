import React, { Component } from 'react';

import { ConnectedGenres } from "../containers";
import { Search } from "./Search.jsx";
import { fetchBookList } from "../actions.js";
import { store } from "../store";
import { isEmpty } from "../utils.js";
import { Loading } from "./shared/Loading";
import { BookView } from "./BookView.jsx";

export class BookListView extends Component {
    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    render() {
        const books = this.props.books;
        if(isEmpty(books)) {
            return <Loading />;
        }

        return(
            <div>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <Search />
                            <ConnectedGenres />
                            <br/>
                            <BookView books={books} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
