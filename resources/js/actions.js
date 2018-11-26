import { DOMAIN } from "./domain";

export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });
export const setGenres = genres => ({ type: "SET_GENRES", genres });
export const setBookDetail = bookDetail => ({type: "SET_BOOK_DETAIL", bookDetail});
export const setUsersBookshelf = usersBookshelf => ({type: "SET_USERS_BOOKSHELF", usersBookshelf});

export const fetchTimeLine = () => dispatch => {
    const timeLine = [
      { name: "bok1" },
      { name: "bok2" },
    ];
    dispatch(setTimeLine(timeLine));
}

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

export const fetchBookDetail = (id) => dispatch => {
    fetch(`http://localhost:8000/api/books/${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch(setBookDetail(json));
    })
}

export const fetchUsersBookshelf = (userId) => dispatch => {
    console.log("action: fetchUserBookshelf");
    fetch(`http://localhost:8000/api/users/${userId}/user_books`)
        .then(res => res.json())
        .then(json => {
            dispatch(setUsersBookshelf(json));
        })
}
