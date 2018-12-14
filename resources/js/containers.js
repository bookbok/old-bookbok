import { connect } from "react-redux";
import { TimeLine } from "./components/TimeLine";
import { Genres } from "./components/Genres";
import { BookDetailView } from "./components/BookDetailView";
import { UserInfo } from "./components/UserInfo";
import { BookListView } from "./components/BookListView";
import { UsersBookshelf } from "./components/UsersBookshelf";
import { LikeBokList } from "./components/LikeBokList";
import { UserRegister } from "./components/UserRegister";

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

export const ConnectedUsersBookshelf = connect(
    state => state
)(UsersBookshelf);

export const ConnectedBookList = connect(
    state => state,
)(BookListView);

export const ConnectedLikeBokList = connect(
    state => state,
)(LikeBokList);

export const ConnectedUserRegister = connect(
    state => state,
)(UserRegister);
