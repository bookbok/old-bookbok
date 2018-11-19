export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });
export const setBookDetail = bookDetail => ({type: "SET_BOOK_DETAIL", bookDetail});

export const fetchTimeLine = () => dispatch => {
    const timeLine = [
      { name: "bok1" },
      { name: "bok2" },
    ];
    dispatch(setTimeLine(timeLine));
}

export const fetchBookDetail = () => dispatch => {
    // 本の詳細情報をどうにかして取得
    // const bookDetail = { book_name: "book1", book_detail: "hogehoge" };
    fetch("http://localhost:8000/api/books/1")
     .then(res => res.json())
     .then(json => {
      dispatch(setBookDetail(json));
    })
}

