export function rootReducer(
    state = { timeLine: [], bookDetail: {} },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };
        case "SET_BOOK_DETAIL":
            return { ...state, bookDetail: action.bookDetail };
        case "SET_AUTH_TOKEN":
            return { ...state, token: action.token };
    }
    return state;
}
