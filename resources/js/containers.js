import { connect } from "react-redux";
import { TimeLine } from "./components/TimeLine";
import { Genres } from "./components/Genres";
import { BookDetailView } from "./components/BookDetailView";
import { BookListView } from "./components/BookListView";
import { UsersBookshelf } from "./components/UsersBookshelf";

export const ConnectedTimeLine = connect(
    state => state
)(TimeLine);

export const ConnectedGenres = connect(
    state => state
)(Genres);

export const ConnectedBookDetail = connect(
    state => state
)(BookDetailView);

export const ConnectedUsersBookshelf = connect(
    state => state
)(UsersBookshelf);

export const ConnectedBookList = connect(
    state => state,
)(BookListView);
