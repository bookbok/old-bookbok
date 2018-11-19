export function rootReducer(
    state = { timeLine: [], bookDetail: { book_name: "初期タイトル", book_detail: "初期概要" } },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };
        case "SET_BOOK_DETAIL":
            return { ...state, bookDetail: action.bookDetail };
    }
    return state;
}
