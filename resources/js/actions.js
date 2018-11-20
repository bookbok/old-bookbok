export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });
export const setBookDetail = bookDetail => ({type: "SET_BOOK_DETAIL", bookDetail});

export const fetchTimeLine = () => dispatch => {
    const timeLine = [
      { name: "bok1" },
      { name: "bok2" },
    ];
    dispatch(setTimeLine(timeLine));
}

export const fetchBookDetail = (id) => dispatch => {
    fetch(`http://localhost:8000/api/books/${id}`)
        .then(res => res.json())
        .then(json => {
          dispatch(setBookDetail(json));
    })
}

