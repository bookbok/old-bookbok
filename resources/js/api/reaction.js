import * as utils from '../utils';

export const fetchLikeBoks = userId => {
    return utils.wrapFetch(`/api/users/${userId}/likes`);
};

export const requestLike = bokId => {
    return utils.wrapFetch(`/api/boks/${bokId}/likes`, {
        method: 'POST',
    });
};

export const requestUnLike = bokId => {
    return utils.wrapFetch(`/api/boks/${bokId}/likes`, {
        method: 'DELETE',
    });
};

export const fetchLoveBoks = userId => {
    return utils.wrapFetch(`/api/users/${userId}/loves`);
};

export const requestLove = bokId => {
    return utils.wrapFetch(`/api/boks/${bokId}/loves`, {
        method: 'POST',
    });
};

export const requestUnLove = bokId => {
    return utils.wrapFetch(`/api/boks/${bokId}/loves`, {
        method: 'DELETE',
    });
};
