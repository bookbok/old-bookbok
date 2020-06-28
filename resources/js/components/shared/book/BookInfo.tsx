import * as React from 'react';
import * as ResourceTypes from '../../../resource-types';
import { Link } from 'react-router-dom';

interface Props {
    book: ResourceTypes.Book;
}

export class BookInfo extends React.Component<Props> {
    render() {
        const book = this.props.book;

        return (
            <div>
                <div className="d-flex">
                    <img src={book.cover} className="title-book-cover" />
                    <h1>
                        <Link
                            to={`/books/${book.id}`}
                            className="ml-2 d-block text-dark title-book-name"
                        >
                            {book.name}
                        </Link>
                    </h1>
                </div>
                <p className="mt-2">{book.author ? `著者: ${book.author}` : ''}</p>

                <h3 className="mt-5">概要</h3>
                <p>{book.description}</p>
            </div>
        );
    }
}
