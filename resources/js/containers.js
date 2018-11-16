import { connect } from "react-redux";

import { TimeLine } from "./components/TimeLine";
import { Genres } from "./components/Genres";

import { fetchGenres } from "./actions";

export const ConnectedTimeLine = connect(
    state => state
)(TimeLine);

export const ConnectedGenres = connect(
    state => state
)(Genres);
