import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchBookList, fetchMoreBooks } from "../../actions";
import { isEmpty } from "../../utils";
import { Loading } from "../shared/Loading";
import { BookView } from "../BookView";

class BooksSuspense extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasMore: true }
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore(page) {
        // HACK: InfiniteScrollのhasMoreプロパティがfalseでも、一度だけ呼び出されてしまうため(ライブラリバグ？)
        if(this.state.hasMore === false) return;
        fetchMoreBooks({ page: page }).then(json => {
            this.setHasMoreBooks(json.next_page_url);
        });
    }

    setHasMoreBooks(nextPageURL) {
        if(!nextPageURL) {
            this.setState({ hasMore: false });
        } else {
            this.setState({ hasMore: true });
        }
    }

    render() {
        if (!this.props.books) {
            throw fetchBookList().then((json) => {
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
                initialLoad={false}
                pageStart={1}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
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
