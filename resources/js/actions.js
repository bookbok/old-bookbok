import { DOMAIN } from "./domain";
import * as utils from "./utils";
import * as types from "./types";


export const setBokFlow = bokFlow => ({ type: types.SET_BOK_FLOW, bokFlow });
export const fetchBokFlow = () => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/bok_flow").then(json => {
        if(utils.isEmpty(json)){
            dispatch(setBokFlow('最近のBokがありません'));
        } else {
            dispatch(setBokFlow(json));
        }
    });
}

/* ==== Auth actions ==== */
// Get authentication token
export const setAuthToken = (token) => ({ type: types.SET_AUTH_TOKEN, token });
export const requestLogin = (loginUser) => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/auth/login", {
        method: "POST",
        body: loginUser
    }).then(json => {
        dispatch(setAuthToken(json.token));
        dispatch(getLoggedinUser());
    });
}

export const setLoggedinUser = (loggedinUser) => ({ type: types.SET_LOGGEDIN_USER, loggedinUser });
export const getLoggedinUser = () => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/auth/user").then(json => {
        dispatch(setLoggedinUser(json));
    });
}

export const removeLoggedinInfo = () => ({ type: types.REMOVE_LOGGEDIN_INFO });
export const requestLogout = () => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/auth/logout", {
        isParse: false,
    }).then(res => {
        dispatch(removeLoggedinInfo());
    });
}

export const directUserRegister = (userInfo) => {
    return utils.wrapFetch(DOMAIN + "/api/auth/register", {
        method: "POST",
        body: userInfo
    });
};


export const setGenres = genres => ({ type: types.SET_GENRES, genres });
export const fetchGenres = () => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/genres")
        .then(json => {
            dispatch(setGenres(json));
        });
}

export const setBookDetail = bookDetail => ({type: types.SET_BOOK_DETAIL, bookDetail});
export const fetchBookDetail = (id) => dispatch => {
    utils.wrapFetch(DOMAIN + `/api/books/${id}`)
        .then(json => {
            dispatch(setBookDetail(json));
        });
}

export const setUsers = users => ({type: types.SET_USERS, users });
export const fetchUsers = () => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/users/")
        .then(json => {
                dispatch(setUsers(json));
        });
}

export const setUser = user => ({type: types.SET_USER, user});
export const fetchUser = (userId) => dispatch => {
    utils.wrapFetch(DOMAIN + `/api/users/${userId}`)
        .then(json => {
            dispatch(setUser(json));
        });
}

export const setUserBookshelf = userBookshelf => ({type: types.SET_USER_BOOKSHELF, userBookshelf});
export const fetchUserBookshelf = (userId) => dispatch => {
    utils.wrapFetch(DOMAIN + `/api/users/${userId}/user_books`)
        .then(json => {
            dispatch(setUserBookshelf(json));
        });
}

export const setUserBookDetail = userBookDetail => ({ type: types.SET_USER_BOOK_DETAIL, userBookDetail });
export const fetchUserBookDetail = (userId, userBookId) => dispatch => {
    utils.wrapFetch(DOMAIN + `/api/users/${userId}/user_books/${userBookId}`)
        .then(json => {
            dispatch(setUserBookDetail(json));
        });
}

export const setBookList = books => ({type: types.SET_BOOKLIST, books});
// TODO: Rename to fetchBooksWithQuery
export const fetchBookList = (query = {}) => dispatch => {
    utils.wrapFetch(DOMAIN + "/api/books/", {
        body: query,
    }).then(json => {
        dispatch(setBookList(json));
    }).catch(err => {
        console.error("fetchBookList: ", err);
    });
}

export const setLikeBoks = likeBoks => ({type: types.SET_LIKEBOKLIST, likeBoks});
export const fetchLikeBoks = (userId) => dispatch => {
    utils.wrapFetch(DOMAIN + `/api/users/${userId}/likes`)
       .then(json => {
          dispatch(setLikeBoks(json));
       });
}

export const setReview = review => ({ type: types.SET_REVIEW, review });
export const reviewRegister = (userBookId, body) => {
    return utils.smartFetch(DOMAIN + `/api/user_books/${userBookId}/review`, {
        method: "POST",
        body: { "body": body },
    });
}

export const storeISBNToUserBookDirect = (userId, isbn) => {
    return utils.smartFetch(DOMAIN + `/api/users/${userId}/user_books`, {
        method: "POST",
        body: { "isbn": isbn },
    });
}

export const requestFollow = (userId, targetId) => {
    return utils.wrapFetch(DOMAIN + `/api/users/${userId}/followings`, {
        method: "POST",
        body: { "user_id": targetId },
    });
}
