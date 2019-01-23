import { store } from "./store";
import * as utils from "./utils";
import * as types from "./types";

/**
 * ==== Alert message ====
 */
export const setAlertMessage = alertMessage => ({ type: type.SET_ALERT_MESSAGE, alertMessage })

/**
 * ==== Top page (time line) ====
 */
export const setBokFlow = bokFlow => ({ type: types.SET_BOK_FLOW, bokFlow });
export const fetchBokFlow = () => dispatch => {
    utils.wrapFetch('/api/bok_flow').then(json => {
        if(utils.isEmpty(json)){
            dispatch(setBokFlow('最近のBokがありません'));
        } else {
            dispatch(setBokFlow(json));
        }
    });
}


/**
 * ==== Auth actions ====
 */

// Get authentication token
export const setAuthToken = (token) => ({ type: types.SET_AUTH_TOKEN, token });
export const requestLogin = (loginUser) => {
    return utils.wrapFetch('/api/auth/login', {
        method: "POST",
        body: loginUser
    }).then(json => {
        store.dispatch(setAuthToken(json.token));
        store.dispatch(getLoggedinUser());

        if (loginUser.remember && utils.storageAvailable('localStorage')) {
            localStorage.setItem('token', json.token);
        }
    });
}

export const setLoggedinUser = (loggedinUser) => ({ type: types.SET_LOGGEDIN_USER, loggedinUser });
export const getLoggedinUser = () => dispatch => {
    utils.wrapFetch('/api/auth/user').then(json => {
        dispatch(setLoggedinUser(json));
    });
}

export const requestUpdateUser = (user) => dispatch => {
    utils.wrapFetch('/api/auth/user', {
        method: 'PUT',
        body: user,
    }).then(json => {
        // 更新が完了したデータをstoreのユーザー情報として更新
        store.dispatch(setLoggedinUser(json));
        store.dispatch(fetchUser(json.id));
    });
}

export const removeLoggedinInfo = () => ({ type: types.REMOVE_LOGGEDIN_INFO });
export const requestLogout = () => dispatch => {
    utils.wrapFetch('/api/auth/logout', {
        isParse: false,
    }).then(res => {
        dispatch(removeLoggedinInfo());

        if (utils.storageAvailable('localStorage') && localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
    });
}

export const directUserRegister = (userInfo) => {
    return utils.smartFetch('/api/auth/register', {
        method: "POST",
        body: userInfo
    });
};


/**
 * ==== Genre resource ====
 */

export const setGenres = genres => ({ type: types.SET_GENRES, genres });
export const fetchGenres = () => dispatch => {
    utils.wrapFetch('/api/genres')
        .then(json => {
            dispatch(setGenres(json));
        });
}


/**
 * ==== Book resource ====
 */

export const setBookDetail = bookDetail => ({type: types.SET_BOOK_DETAIL, bookDetail});
export const fetchBookDetail = (id) => dispatch => {
    utils.wrapFetch(`/api/books/${id}`)
        .then(json => {
            dispatch(setBookDetail(json));
        });
}

export const setBookList = books => ({type: types.SET_BOOKLIST, books});
// TODO: Rename to fetchBooksWithQuery
export const fetchBookList = (query = {}) => {
    return utils.wrapFetch('/api/books/', {
        body: query,
    }).then(json => {
        store.dispatch(setBookList(json));
        return json;
    });
}
export const addBooks = books => ({type: types.ADD_BOOKS, books});
export const fetchMoreBooks = (query = {}) => {
    return utils.wrapFetch('/api/books/', {
        body: query,
    }).then(json => {
        store.dispatch(addBooks(json));
        return json;
    });
}


/**
 * ==== User resource ====
 */

export const setUsers = users => ({type: types.SET_USERS, users });
export const fetchUsers = () => dispatch => {
    utils.wrapFetch('/api/users/')
        .then(json => {
                dispatch(setUsers(json));
        });
}

export const setUser = user => ({type: types.SET_USER, user});
export const fetchUser = (userId) => dispatch => {
    utils.wrapFetch(`/api/users/${userId}`)
        .then(json => {
            dispatch(setUser(json));
        });
}


/**
 * ==== UserBook resource ====
 */

export const setUserBookshelf = userBookshelf => ({type: types.SET_USER_BOOKSHELF, userBookshelf});
export const fetchUserBookshelf = (userId) => dispatch => {
    utils.wrapFetch(`/api/users/${userId}/user_books`)
        .then(json => {
            dispatch(setUserBookshelf(json));
        });
}

export const setUserBookDetail = userBookDetail => ({ type: types.SET_USER_BOOK_DETAIL, userBookDetail });
export const fetchUserBookDetail = (userId, userBookId) => dispatch => {
    utils.wrapFetch(`/api/users/${userId}/user_books/${userBookId}`)
        .then(json => {
            dispatch(setUserBookDetail(json));
        });
}

export const storeISBNToUserBookDirect = (userId, isbn) => {
    return utils.smartFetch(`/api/users/${userId}/user_books`, {
        method: "POST",
        body: { "isbn": isbn },
    });
}

export const setBokToUserBook = bok => ({ type: types.SET_BOK_TO_USER_BOOK, bok });
export const registerBok = (userBookId, bok) => {
    return utils.smartFetch(`/api/user_books/${userBookId}/boks`, {
        method: 'POST',
        body: bok,
    });
}

/** ネタバレflgや読書状況を更新する */
export const requestUpdateUserBookStatus = (userId, userBookId, body) => {
    return utils.wrapFetch(`/api/users/${userId}/user_books/${userBookId}`, {
        method: 'PUT',
        body: body,
    }).then(json => {
        store.dispatch(setUserBookDetail(json));
    });
}

/**
 * ==== Review resource ====
 */

export const setReview = review => ({ type: types.SET_REVIEW, review });
export const reviewRegister = (userBookId, review) => {
    return utils.smartFetch(`/api/user_books/${userBookId}/review`, {
        method: "POST",
        body: review,
    });
}


/**
 * ==== Follower resource ====
 */

export const setFollowers = followers => ({ type: types.SET_FOLLOWERS, followers });
export const fetchFollowers = userId => dispatch => {
    utils.wrapFetch(`/api/users/${userId}/followers`).then(res => {
        dispatch(setFollowers(res));
    });
}

export const setFollowings = followings => ({ type: types.SET_FOLLOWINGS, followings });
export const fetchFollowings = userId => dispatch => {
    utils.wrapFetch(`/api/users/${userId}/followings`).then(res => {
        dispatch(setFollowings(res));
    });
}

export const requestFollow = (userId, targetId) => {
    return utils.wrapFetch(`/api/users/${userId}/followings`, {
        method: "POST",
        body: { "user_id": targetId },
    });
}

export const requestUnFollow = (userId, targetId) => {
    return utils.wrapFetch(`/api/users/${userId}/followings/{targetId}`, {
        method: "DELETE",
    });
}


/**
 * ==== Reaction resource ====
 */

export const setLikeBoks = likeBoks => ({type: types.SET_LIKEBOKLIST, likeBoks});
export const fetchLikeBoks = (userId) => dispatch => {
    utils.wrapFetch(`/api/users/${userId}/likes`)
       .then(json => {
          dispatch(setLikeBoks(json));
       });
}

export const requestLike = (bokId) => {
    return utils.wrapFetch(`/api/boks/${bokId}/likes`, {
        method: "POST",
    });
}

export const requestUnLike = (bokId) => {
    return utils.wrapFetch(`/api/boks/${bokId}/likes`, {
        method: "DELETE",
    });
}

export const setLoveBoks = loveBoks => ({type: types.SET_LOVEBOKLIST, loveBoks});
export const fetchLoveBoks = (userId) => dispatch => {
    utils.wrapFetch(`/api/users/${userId}/loves`)
        .then(json => {
            dispatch(setLoveBoks(json));
        });
}

export const requestLove = (bokId) => {
    return utils.wrapFetch(`/api/boks/${bokId}/loves`, {
        method: "POST",
    });
}

export const requestUnLove = (bokId) => {
    return utils.wrapFetch(`/api/boks/${bokId}/loves`, {
        method: "DELETE",
    });
}

