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

        case "SET_AUTH_TOKEN": // ログインを必要とするAPI用の認証トークンを保存
            return { ...state, token: action.token };

        case "REMOVE_AUTH_TOKEN": // ログアウトに伴い、ログイントークンを削除
            return { ...state, token: null };
    }
    return state;
}
