export const setTimeLine = timeLine => ({ type: "SET_TIMELINE", timeLine });

export const fetchTimeLine = () => dispatch => {
    const timeLine = [
      { name: "bok1" },
      { name: "bok2" },
    ];
    dispatch(setTimeLine(timeLine));
}
