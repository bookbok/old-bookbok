import { DOMAIN } from "./domain";
import * as utils from "./utils";
import { store } from "./store";
import * as types from "./types";

// stateの値を取得し、自動更新する
let state = store.getState();
store.subscribe(() => {
    state = store.getState();
});

// fetch関数を綺麗に扱えるようにするラッパー関数
export async function wrapFetch(url, { body, method = "GET", isParse = true } = {}) {
    // GETリクエスト時にクエリパラメーターを自動作成する
    if(method === "GET" && !utils.isEmpty(body)) {
        url += "?" + utils.convertQuery(body);
    } else if(!utils.isEmpty(body)) { // not get request && body not empty
        body = JSON.stringify(body);
    }

    const res = await fetch(url, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${state.token}`,
        },
        body: method === "GET" ? null : body // GET時はクエリで代用するため
    });

    if(res.status === 401) {
        throw new Error("Authorization error: " + res.statusText);
    } else if(!utils.successfulStatus(res.status)) {
        throw new Error("Fetch error: " + res.statusText);
    }

    if(isParse) {
        return await res.json();
    }
    return null;
}

// 封印されしラッパー関数
export function wrapAction(actionCreator, callback) {
    return (...args) => {
        return actionCreator(...args)
            .then(json => callback(json));
    }
}


export const setTimeLine = timeLine => ({ type: types.SET_TIMELINE, timeLine });

/* ==== Auth actions ==== */
// Get authentication token
export const setAuthToken = (token) => ({ type: types.SET_AUTH_TOKEN, token });
export const requestLogin = (loginUser) => dispatch => {
    wrapFetch(DOMAIN + "/api/auth/login", {
        method: "POST",
        body: loginUser
    }).then(json => {
        dispatch(setAuthToken(json.token));
        dispatch(getLoggedinUser());
    });
}

export const setLoggedinUser = (loggedinUser) => ({ type: types.SET_LOGGEDIN_USER, loggedinUser });
export const getLoggedinUser = () => dispatch => {
    wrapFetch(DOMAIN + "/api/auth/user").then(json => {
        dispatch(setLoggedinUser(json));
    });
}

export const removeLoggedinInfo = () => ({ type: types.REMOVE_LOGGEDIN_INFO });
export const requestLogout = () => dispatch => {
    wrapFetch(DOMAIN + "/api/auth/logout", {
        isParse: false,
    }).then(res => {
        dispatch(removeLoggedinInfo());
    });
}

export const setUserRegister = register => ({ type: types.SET_USER_REGISTER, register });
export const requestUserRegister = (userInfo) => dispatch => {
    wrapFetch(DOMAIN + "/api/auth/register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => {
            dispatch(setUserRegister(res.status));
        })
        .catch(err => {
            dispatch(setUserRegister(err));
        });
};


export const setGenres = genres => ({ type: types.SET_GENRES, genres });
export const fetchGenres = () => dispatch => {
    wrapFetch(DOMAIN + "/api/genres")
        .then(json => {
            dispatch(setGenres(json));
        });
}

export const setBookDetail = bookDetail => ({type: types.SET_BOOK_DETAIL, bookDetail});
export const fetchBookDetail = (id) => dispatch => {
    wrapFetch(DOMAIN + `/api/books/${id}`)
        .then(json => {
            dispatch(setBookDetail(json));
        });
}

export const setUserInfo = userInfo => ({type: types.SET_USER_INFO, userInfo });
export const fetchUserInfo = () => dispatch => {
    wrapFetch( DOMAIN + "/api/users/")
        .then(json => {
                dispatch(setUserInfo(json));
        })
        .catch(err => {
            console.error("fetch error!", err);
        });
}

export const setUsersBookshelf = usersBookshelf => ({type: types.SET_USERS_BOOKSHELF, usersBookshelf});
export const fetchUsersBookshelf = (userId) => dispatch => {
    wrapFetch(DOMAIN + `/api/users/${userId}/user_books`)
        .then(json => {
            dispatch(setUsersBookshelf(json));
        });
}

export const setBookList = books => ({type: types.SET_BOOKLIST, books});
export const fetchBookList = () => dispatch => {
    wrapFetch(DOMAIN + "/api/books/")
        .then(json => {
            dispatch(setBookList(json));
        }).catch(err => {
            console.error("fetchBookList: ", err);
        });
}

export const setLikeBoks = likeBoks => ({type: types.SET_LIKEBOKLIST, likeBoks});
export const fetchLikeBoks = (userId) => dispatch => {
    wrapFetch(DOMAIN + `/api/users/${userId}/likes`)
       .then(json => {
          dispatch(setLikeBoks(json));
       });
}
