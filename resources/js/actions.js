import { DOMAIN } from "./domain";

export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });
export const fetchTimeLine = () => dispatch => {
    const timeLine = [
      { name: "bok1" },
      { name: "bok2" },
    ];
    dispatch(setTimeLine(timeLine));
}


/* ==== Auth actions ==== */
// Get authentication token
export const setAuthToken = (token) => ({ type: "SET_AUTH_TOKEN", token });
export const requestLogin = (loginUser) => dispatch => {
    fetch(DOMAIN + "/api/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser)
    })
        .then(res => res.json())
        .then(json => {
            dispatch(setAuthToken(json.token));
        });
}

export const removeAuthToken = () => ({ type: "REMOVE_AUTH_TOKEN" });
export const requestLogout = () => dispatch => {
    fetch(DOMAIN + "/api/logout")
        .then(res => {
            dispatch(removeAuthToken());
        });
}


export const setGenres = genres => ({ type: "SET_GENRES", genres });
export const fetchGenres = () => dispatch => {
    fetch( DOMAIN + "/api/genres/", {
        timeout: 3000,
        method: "GET"
    })
        .then(res => res.json())
        .then(json => {
                dispatch(setGenres(json));
        })
        .catch(err => {
            console.error("fetch error!", err);
        });
}

export const setBookDetail = bookDetail => ({type: "SET_BOOK_DETAIL", bookDetail});
export const fetchBookDetail = (id) => dispatch => {
    fetch(DOMAIN + `/api/books/${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch(setBookDetail(json));
    })
}

export const setUsersBookshelf = usersBookshelf => ({type: "SET_USERS_BOOKSHELF", usersBookshelf});
export const fetchUsersBookshelf = (userId) => dispatch => {
    fetch(DOMAIN + `/api/users/${userId}/user_books`)
        .then(res => res.json())
        .then(json => {
            dispatch(setUsersBookshelf(json));
        })
}
