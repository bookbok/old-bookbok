import * as utils from '../utils';

export const fetchUserBooks = userId => {
    return utils.wrapFetch(`/api/users/${userId}/user_books`);
};

export const fetchUserBook = (userId, userBookId) => {
    return utils.wrapFetch(`/api/users/${userId}/user_books/${userBookId}`);
};

export const postUserBookFrom = (userId, isbn) => {
    return utils.smartFetch(`/api/users/${userId}/user_books`, {
        method: 'POST',
        body: { isbn: isbn },
    });
};

export const postUserBooksFrom = (userId, isbnList) => {
    return utils.smartFetch('/api/import_books', {
        body: isbnList,
        method: 'POST',
    });
};

/** ネタバレflgや読書状況を更新する */
export const putUpdatedUserBookStat = (userId, userBookId, body) => {
    return utils.wrapFetch(`/api/users/${userId}/user_books/${userBookId}`, {
        method: 'PUT',
        body: body,
    });
};
