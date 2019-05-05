import * as utils from '../utils';

export const postReview = (userBookId, review) => {
    return utils.smartFetch(`/api/user_books/${userBookId}/review`, {
        method: 'POST',
        body: review,
    });
};
