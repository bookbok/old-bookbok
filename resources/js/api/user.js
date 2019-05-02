import * as utils from '../utils';

export const fetchUsers = () => {
    return utils.wrapFetch('/api/users/');
};

export const fetchUser = userId => {
    return utils.wrapFetch(`/api/users/${userId}`);
};
