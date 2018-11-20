import { connect } from "react-redux";

import { TimeLine } from "./components/TimeLine";
import { BookDetailView } from "./components/BookDetailView";

export const ConnectedTimeLine = connect(
    state => state
)(TimeLine);

export const ConnectedBookDetail = connect(
    state => state
)(BookDetailView);
