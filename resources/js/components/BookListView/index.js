import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchBookList } from "../../actions";
import { store } from "../../store";
import { isEmpty } from "../../utils";

import { ConnectedGenres } from "../../containers";
import { Search } from "../Search";
import { Loading } from "../shared/Loading";
import { BookView } from "../BookView";
import { ISBNModal } from "../shared/book/ISBNModal";

let flg = false;
const BooksSuspense = (props) => {
    if (flg == false && !props.books) {
        throw fetchBookList();
        flg = true;
    }

    return books.map((book) => {
        return <BookView book={book} link={`/books/${book.id}`} key={book.id} />
    });
}

class BookListView extends Component {
    constructor(props) {
        super(props);

        this.state = { q: "", isLoading: true };
        this.handleSubmitSearchText = this.handleSubmitSearchText.bind(this);
        this.handleClickSearchGenre = this.handleClickSearchGenre.bind(this);
    }

    componentDidMount() {
    };

    handleSubmitSearchText(q) {
        this.setState({ q: q }); // 現状stateに入れる必要はないが、ジャンルでの絞り込みも始めた時に必要になりそうなので
        fetchBookList({ q: q });
    }

    handleClickSearchGenre(genre) {
        fetchBookList({ genres: [genre] });
    }

    render() {
        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="d-flex">
                        <div className="m-3">
                            <ConnectedGenres handleClickSearchGenre={this.handleClickSearchGenre} />
                        </div>
                        <div className="m-3">
                            <Search handleSubmit={this.handleSubmitSearchText} />
                        </div>
                    </div>
                    <div className="m-3">
                        <ISBNModal />
                    </div>
                    <div className="mt-4 book-list-wrapper">
                        <Suspense maxDuration={1000} fallback={<Loading />}>
                            <BooksSuspense books={this.props.books}/>
                            <div className="clear-float-left" />
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(state => state)(BookListView));
