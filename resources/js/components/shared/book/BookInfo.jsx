import React, { Component } from "react";
import PropTypes from 'prop-types';

/**
 * @param {Object} book
 *   {id,name,cover,description[,author]}を含むオブジェクトを渡す必要がある
 *
 */
export class BookInfo extends Component {
    render() {
        const book = this.props.book;

        return (
            <div>
                <div className="d-flex">
                    <img src={book.cover} className="title-book-cover"/>
                    <h1>
                        <a href={`/books/${book.id}`}
                           className="ml-2 d-block text-success title-book-name">
                            {book.name}
                        </a>
                    </h1>
                </div>
                <p className="mt-2">{book.author ? `著者: ${book.author}` : ''}</p>

                <h3 className="mt-5">概要</h3>
                <p>{book.description}</p>
            </div>
        );
    }
}

BookInfo.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        author: PropTypes.string,
    })
};
