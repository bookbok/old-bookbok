export function rootReducer(
    state = { timeLine: [] },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };
    }
    return state;
}
