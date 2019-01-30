import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchBookList, fetchGenres } from "../../actions";
import { store } from "../../store";
import { isEmpty } from "../../utils";

//import { ConnectedGenres } from "../../containers";
import Genres from '../Genres';
import { Search } from "../Search";
import { Loading } from "../shared/Loading";
import { ISBNModal } from "../shared/book/ISBNModal";
import BooksSuspense from "./BooksSuspense";


class BookListView extends Component {
    constructor(props) {
        super(props);

        this.state = { q: "", genres: null };
        this.handleSubmitSearchText = this.handleSubmitSearchText.bind(this);
        this.handleClickSearchGenre = this.handleClickSearchGenre.bind(this);
    }

    componentDidMount(){
        store.dispatch(fetchGenres());
    }

    handleSubmitSearchText(q) {
        this.setState({ q: q }); // 現状stateに入れる必要はないが、ジャンルでの絞り込みも始めた時に必要になりそうなので
        fetchBookList({ q: q });
    }

    handleClickSearchGenre(genre) {
        this.setState({ genres: [genre] });
        fetchBookList({ genres: [genre] });
    }

    render() {
        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="d-flex">
                        <div className="m-3">
                            <Genres
                                handleClickSearchGenre={this.handleClickSearchGenre}
                                genres={this.props.genres}
                                activeGenreId={this.state.genres ? this.state.genres[0] : null} />
                        </div>
                        <div className="m-3">
                            <Search handleSubmit={this.handleSubmitSearchText} />
                        </div>
                    </div>
                    <div className="m-3">
                        <ISBNModal />
                    </div>
                    <div className="mt-4 book-list-wrapper">
                        {/* async component */}
                        <Suspense maxDuration={1000} fallback={<Loading />}>
                            <BooksSuspense books={this.props.books} query={this.state}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(state => state)(BookListView));
