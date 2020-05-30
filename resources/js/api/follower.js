import * as utils from '../utils';

export const fetchFollowers = userId => {
    return utils.wrapFetch(`/api/users/${userId}/followers`);
};

export const fetchFollowings = userId => {
    return utils.wrapFetch(`/api/users/${userId}/followings`);
};

export const requestFollowTo = (userId, targetId) => {
    return utils.wrapFetch(`/api/users/${userId}/followings`, {
        method: 'POST',
        body: { user_id: targetId },
    });
};

export const requestUnFollow = (userId, targetId) => {
    return utils.wrapFetch(`/api/users/${userId}/followings/${targetId}`, {
        method: 'DELETE',
    });
};
