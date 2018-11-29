import { connect } from "react-redux";
import { TimeLine } from "./components/TimeLine";
import { Genres } from "./components/Genres";
import { BookDetailView } from "./components/BookDetailView";
import { UserInfo } from "./components/UserInfo";

export const ConnectedTimeLine = connect(
    state => state
)(TimeLine);

export const ConnectedGenres = connect(
    state => state
)(Genres);

export const ConnectedBookDetail = connect(
    state => state
)(BookDetailView);

export const ConnectedUserInfo = connect(
    state => state
)(UserInfo);

