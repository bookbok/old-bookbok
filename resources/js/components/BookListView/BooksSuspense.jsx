import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchBookList, fetchMoreBooks } from "../../actions";
import { isEmpty } from "../../utils";
import { Loading } from "../shared/Loading";
import { BookView } from "../BookView";
import { ISBNModal } from "../shared/book/ISBNModal";

class BooksSuspense extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.hasMoreBooks = this.hasMoreBooks.bind(this);
    }

    loadMore(page) {
        fetchMoreBooks({ ...this.props.query, page: page });
    }

    // BooksAPIからのレスポンスをそのまま受け取り、次のページがあるかboolで返す
    hasMoreBooks(books) {
        if(books && books.next_page_url) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.props.books) {
            throw fetchBookList();
        }

        if(isEmpty(this.props.books.data)) {
            return <img src="/images/book-search-error.svg" className="book-search-error"/>
        }

        const books = this.props.books.data.map((book) => {
            return <BookView book={book} link={`/books/${book.id}`} key={book.id} />;
        });
        return (
            <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={this.loadMore}
                hasMore={this.hasMoreBooks(this.props.books)}
                loader={<Loading key="0"/>}>

                {books}
                <div className="clear-float-left" />
            </InfiniteScroll>
        );
    }
}

BooksSuspense.propTypes = {
    books: PropTypes.shape({
        data: PropTypes.array,
    })
}

export default BooksSuspense;
