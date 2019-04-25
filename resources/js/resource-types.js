import { PropTypes } from 'prop-types';

export const ResourceTypes = {
    BOOK_PROP_TYPES,
    USER_PROP_TYPES,
    USER_BOOKS_PROP_TYPES,
};

const BOOK_PROP_TYPES = PropTypes.shape({
    id: PropTypes.any.isRequired,
    isbn: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre_id: PropTypes.any.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
});

const USER_PROP_TYPES = PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string, // avatarは空文字を許す
    description: PropTypes.string.isRequired,
    role_id: PropTypes.any.isRequired,
    follower_count: PropTypes.any.isRequired,
    following_count: PropTypes.any.isRequired,
    is_follower: PropTypes.any.isRequired,
    is_following: PropTypes.any.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
});

const USER_BOOKS_PROP_TYPES = PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string, // avatarは空文字を許す
    description: PropTypes.string.isRequired,
    role_id: PropTypes.any.isRequired,
    books: PropTypes.arrayOf(BOOK_PROP_TYPES),
});
