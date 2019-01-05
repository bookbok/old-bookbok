import * as types from "./types";

export function rootReducer(
    state = {},
    action
) {
    switch(action.type) {
        case types.SET_BOK_FLOW:
            return { ...state, bokFlow: action.bokFlow };

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

        case types.SET_USERS:
            return { ...state, users: action.users };

        case types.SET_USER:
            return { ...state, user: action.user };

        case types.SET_USER_BOOK_DETAIL:
            return { ...state, userBookDetail: action.userBookDetail };

        case types.SET_BOK_TO_USER_BOOK:
            // userBookDetailのboksに、新しいbokを一つ追加する
            return {
                ...state,
                userBookDetail: {
                    ...state.userBookDetail,
                    boks: [ ...state.userBookDetail.boks, action.bok ],
                }
            };

        case types.SET_LIKEBOKLIST:
            return { ...state, likeBoks: action.likeBoks };

        case types.SET_FOLLOWERS:
            return { ...state, followers: action.followers };

        case types.SET_FOLLOWINGS:
            return { ...state, followings: action.followings };

        case types.REMOVE_LOGGEDIN_INFO: // ログアウトに伴い、ログイントークン、ログイン中ユーザー情報を削除
            return { ...state, token: null, loggedinUser: null };

        case types.SET_REVIEW:
            return { ...state, userBookDetail: { ...state.userBookDetail, review: action.review } };


    }

    return state;
}

