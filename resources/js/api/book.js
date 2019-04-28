import * as utils from '../utils';

export const fetchBook = id => {
    return utils.wrapFetch(`/api/books/${id}`);
};

export const fetchBooks = (query = {}) => {
    return utils.wrapFetch('/api/books/', {
        body: query,
    });
};
