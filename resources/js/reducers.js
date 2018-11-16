export function rootReducer(
    state = { timeLine: [], genres: [] },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };
        
        case "SET_GENRES":
            console.log(action.genres);
            return { ...state, genres: action.genres };
    }
    return state;
}
