import { connect } from "react-redux";
import { Genres } from "./components/Genres";
import { BookDetailView } from "./components/BookDetailView";
import { UsersView } from "./components/UsersView";


export const ConnectedGenres = connect(
    state => state
)(Genres);

export const ConnectedBookDetail = connect(
    state => state
)(BookDetailView);

export const ConnectedUsersView = connect(
    state => state
)(UsersView);

