import { DOMAIN } from "./domain";
import * as utils from "./utils";
import { store } from "./store";

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


export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });

/* ==== Auth actions ==== */
// Get authentication token
export const setAuthToken = (token) => ({ type: "SET_AUTH_TOKEN", token });
export const requestLogin = (loginUser) => dispatch => {
    wrapFetch(DOMAIN + "/api/login", {
        method: "POST",
        body: loginUser
    }).then(json => {
        dispatch(setAuthToken(json.token));
    });
}

export const removeAuthToken = () => ({ type: "REMOVE_AUTH_TOKEN" });
export const requestLogout = () => dispatch => {
    wrapFetch(DOMAIN + "/api/logout", {
        isParse: false,
    }).then(res => {
        dispatch(removeAuthToken());
    });
}

export const requestUserRegister = (userInfo) => dispatch => {
    /* TODO: サーバー側が実装されれば書く
    fetch(DOMAIN + "/api/register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => {
        });
    */
};


export const setGenres = genres => ({ type: "SET_GENRES", genres });
export const fetchGenres = () => dispatch => {
    wrapFetch(DOMAIN + "/api/genres")
        .then(json => {
            dispatch(setGenres(json));
        });
}

export const setBookDetail = bookDetail => ({type: "SET_BOOK_DETAIL", bookDetail});
export const fetchBookDetail = (id) => dispatch => {
    wrapFetch(DOMAIN + `/api/books/${id}`)
        .then(json => {
            dispatch(setBookDetail(json));
        });
}

export const setUserInfo = userInfo => ({type: "SET_USER_INFO", userInfo });
export const fetchUserInfo = () => dispatch => {
    fetch( DOMAIN + "/api/users/", {
        timeout: 3000,
        method: "GET"
    })
        .then(res => res.json())
        .then(json => {
                dispatch(setUserInfo(json));

        })
        .catch(err => {
            console.error("fetch error!", err);
        });
}

export const setUsersBookshelf = usersBookshelf => ({type: "SET_USERS_BOOKSHELF", usersBookshelf});
export const fetchUsersBookshelf = (userId) => dispatch => {
    wrapFetch(DOMAIN + `/api/users/${userId}/user_books`)
        .then(json => {
            dispatch(setUsersBookshelf(json));
        });
}

export const setBookList = books => ({type: "SET_BOOKLIST", books});
export const fetchBookList = () => dispatch => {
    wrapFetch(DOMAIN + "/api/books/")
        .then(json => {
            dispatch(setBookList(json));
        }).catch(err => {
            console.error("fetchBookList: ", err);
        });
}
