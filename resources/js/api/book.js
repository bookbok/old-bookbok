import * as utils from "../utils";

export const fetchBook = (id) => {
    return utils.wrapFetch(`/api/books/${id}`);
}

export const fetchBooks = (query = {}) => {
    return utils.wrapFetch('/api/books/', {
        body: query,
    });
}

// HACK: fetchBooksとfetchMoreBooksはBooksPaginator的なページやqueryを管理してくれるクラスがあると良い
export const fetchMoreBooks = (query = {}) => {
    return utils.wrapFetch('/api/books/', {
        body: query,
    });
}
