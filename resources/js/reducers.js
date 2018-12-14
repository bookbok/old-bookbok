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

        case types.SET_USER_BOOKSHELF:
            return { ...state, userBookshelf: action.userBookshelf };

        case types.SET_AUTH_TOKEN: // ログインを必要とするAPI用の認証トークンを保存
            return { ...state, token: action.token };

        case types.SET_LOGGEDIN_USER:
            return { ...state, loggedinUser: action.loggedinUser };

        case types.SET_USER_INFO:
            return { ...state, userInfo: action.userInfo };

        case types.SET_LIKEBOKLIST:
            return { ...state, likeBoks: action.likeBoks };

        case types.REMOVE_LOGGEDIN_INFO: // ログアウトに伴い、ログイントークン、ログイン中ユーザー情報を削除
            return { ...state, token: null, loggedinUser: null };
    }

    return state;
}

