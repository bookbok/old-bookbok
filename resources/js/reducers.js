export function rootReducer(
    state = { timeLine: [] },
    state = { bookDetail: [] },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };
        case "SET_BOOK_DETAIL";
            return { ...state, bookDetail: action.bookDetail };
    }
    return state;
}
