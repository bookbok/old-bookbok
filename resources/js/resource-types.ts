import PropTypes from 'prop-types';

export interface RootState {
    alertView?: any;
    loggedinUser?: any;
    isPrepared: boolean;
    token?: any;
    books?: any;
    userBookDetail?: any;
}

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

const simpleUser = {
    id: idType.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string, // avatarは空文字を許す
    description: PropTypes.string,
    role_id: idType.isRequired,
    is_follower: PropTypes.any.isRequired,
    is_following: PropTypes.any.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
};

export const SIMPLE_USER = PropTypes.shape(simpleUser);

export const USER = PropTypes.shape({
    ...simpleUser,
    follower_count: PropTypes.any.isRequired,
    following_count: PropTypes.any.isRequired,
});

export const CURRENT_USER = PropTypes.shape({
    id: idType.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string, // avatarは空文字を許す
    description: PropTypes.string,
    role_id: idType.isRequired,
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

export const BOK = PropTypes.shape({
    id: idType.isRequired,
    user_id: idType.isRequired,
    user_book_id: idType.isRequired,
    page_num_begin: idType,
    page_num_end: idType,
    line_num: idType,
    body: PropTypes.string,
    liked_count: idType.isRequired,
    loved_count: idType.isRequired,
    liked: PropTypes.bool.isRequired,
    loved: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    user_book: PropTypes.object,
});

export const GENRE = PropTypes.shape({
    id: idType.isRequired,
    name: PropTypes.string.isRequired,
});

export const REVIEW = PropTypes.shape({
    id: idType.isRequired,
    body: PropTypes.string,
    published_at: PropTypes.string,
    user_book_id: idType.isRequired,
    user_id: idType.isRequired,
});

export const USER_BOOK = PropTypes.shape({
    id: idType.isRequired,
    user_id: idType.isRequired,
    book_id: idType.isRequired,
    reading_status: PropTypes.oneOf(['0', '5', '10', '15', '20', 0, 5, 10, 15, 20]).isRequired,
    is_spoiler: PropTypes.bool.isRequired,
});

export interface Route {
    push: (path: string) => any;
    replace: (any) => any;
    createHref: (any) => any;
}

export const ROUTER = PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
}).isRequired;

export const MATCHER = PropTypes.shape({
    params: PropTypes.object.isRequired,
}).isRequired;
