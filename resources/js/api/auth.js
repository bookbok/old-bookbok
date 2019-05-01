import * as utils from '../utils';

export const requestLogin = loginUser => {
    return utils.wrapFetch('/api/auth/login', {
        method: 'POST',
        body: loginUser,
    });
};

export const fetchCurrentUser = () => {
    return utils.wrapFetch('/api/auth/user');
};

export const putUpdateUser = user => {
    return utils.smartFetch('/api/auth/user', {
        method: 'PUT',
        body: user,
    });
};

export const requestLogout = () => {
    return utils.wrapFetch('/api/auth/logout', {
        isParse: false,
    });
};

export const postUser = user => {
    return utils.smartFetch('/api/auth/register', {
        method: 'POST',
        body: user,
    });
};

export const requestVerifyEmail = url => {
    return utils.wrapFetch(url);
};

export const reRequestVerifyEmail = email => {
    return utils.wrapFetch('/api/auth/email/resend', {
        body: { email },
    });
};
