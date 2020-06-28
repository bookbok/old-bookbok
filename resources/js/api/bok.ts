import * as utils from '../utils';

export const postBok = (userBookId, bok) => {
    return utils.smartFetch(`/api/user_books/${userBookId}/boks`, bok, 'POST');
};

export const deleteBok = bokId => {
    return utils.wrapFetch(`/api/boks/${bokId}`, {
        method: 'DELETE',
    });
};
