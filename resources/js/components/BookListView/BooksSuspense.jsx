import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchBookList, fetchMoreBooks } from "../../actions";
import { isEmpty } from "../../utils";
import { BookView } from "../BookView";

class BooksSuspense extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasMore: true }
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore(page) {
        console.log('more');
        fetchMoreBooks({ page: page }).then(json => {
            console.log('loaded more')
            console.log(json)
            this.setHasMoreBooks(json.next_page_url);
        });
    }

    setHasMoreBooks(nextPageURL) {
        if(nextPageURL) {
            return this.setState({ hasMore: true });
        }
        this.setState({ hasMore: false });
    }

    render() {
        if (!this.props.books) {
            throw fetchBookList().then((json) => {
                console.log(json)
                this.setHasMoreBooks(json.next_page_url);
            });
        }

        if(isEmpty(this.props.books.data)) {
            return <p className="h5">本が見つかりませんでした</p>;
        }

        const books = this.props.books.data.map((book) => {
            return <BookView book={book} link={`/books/${book.id}`} key={book.id} />
        });
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}>
                {books}
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
