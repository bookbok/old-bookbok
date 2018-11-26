export function rootReducer(
    state = { timeLine: [], genres: [], bookDetail: {}, usersBookshelf: {} },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };

        case "SET_GENRES":
            return { ...state, genres: action.genres };

        case "SET_BOOK_DETAIL":
            return { ...state, bookDetail: action.bookDetail };

        case "SET_USERS_BOOKSHELF":
            console.log("reducer: SET_USERS_BOOKSHELF");
            console.table(action.usersBookshelf);
            return { ...state, usersBookshelf: action.usersBookshelf };
    }
    return state;
}
