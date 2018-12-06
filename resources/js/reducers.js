import * as types from "./types";

export function rootReducer(
    state = {},
    action
) {
    switch(action.type) {
        case types.SET_TIMELINE:
            return { ...state, timeLine: action.timeLine };

        case types.SET_GENRES:
            return { ...state, genres: action.genres };

        case types.SET_BOOK_DETAIL:
            return { ...state, bookDetail: action.bookDetail };

        case types.SET_BOOKLIST:
            return { ...state, books: action.books };

        case types.SET_USERS_BOOKSHELF:
            return { ...state, usersBookshelf: action.usersBookshelf };

        case types.SET_AUTH_TOKEN: // ログインを必要とするAPI用の認証トークンを保存
            return { ...state, token: action.token };

        case types.SET_USER_INFO:
            return { ...state, userInfo: action.userInfo };

        case "SET_LIKEBOKS":
            return { ...state, likeBoks: action.likeBoks };

        case types.REMOVE_AUTH_TOKEN: // ログアウトに伴い、ログイントークンを削除
            return { ...state, token: null };
    }

    return state;
}

