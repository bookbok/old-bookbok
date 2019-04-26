import { PropTypes } from 'prop-types';

export const idType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const BOOK = PropTypes.shape({
    id: idType.isRequired,
    isbn: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    cover: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre_id: idType.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
});

export const USER = PropTypes.shape({
    id: idType.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string, // avatarは空文字を許す
    description: PropTypes.string.isRequired,
    role_id: idType.isRequired,
    follower_count: PropTypes.any.isRequired,
    following_count: PropTypes.any.isRequired,
    is_follower: PropTypes.any.isRequired,
    is_following: PropTypes.any.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
});

export const USER_BOOKS = PropTypes.shape({
    id: idType.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string, // avatarは空文字を許す
    description: PropTypes.string.isRequired,
    role_id: idType.isRequired,
    books: PropTypes.arrayOf(BOOK),
});

export const ROUTER = PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
}).isRequired;
