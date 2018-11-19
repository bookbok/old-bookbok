import { DOMAIN } from "./domain";

export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });
export const setGenres = genres => ({ type: "SET_GENRES", genres });

export const fetchTimeLine = () => dispatch => {
    const timeLine = [
      { name: "bok1" },
      { name: "bok2" },
    ];
    dispatch(setTimeLine(timeLine));
}

export const fetchGenres = () => dispatch => {
    fetch( "http://localhost:8000/api/genres/", {
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
