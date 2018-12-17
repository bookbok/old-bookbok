import { connect } from "react-redux";
import { BokFlow } from "./components/BokFlow";
import { Genres } from "./components/Genres";
import { BookDetailView } from "./components/BookDetailView";
import { UserInfo } from "./components/UserInfo";
import { BookListView } from "./components/BookListView";
import { UserBookshelf } from "./components/UserBookshelf";
import { UserBookDetail } from "./components/UserBookDetail";
import { LikeBokList } from "./components/LikeBokList";

export const ConnectedBokFlow = connect(
    state => state
)(BokFlow);

export const ConnectedGenres = connect(
    state => state
)(Genres);

export const ConnectedBookDetail = connect(
    state => state
)(BookDetailView);

export const ConnectedUserInfo = connect(
    state => state
)(UserInfo);

export const ConnectedUserBookshelf = connect(
    state => state
)(UserBookshelf);

export const ConnectedBookList = connect(
    state => state,
)(BookListView);

export const ConnectedUserBookDetail = connect(
    state => state
)(UserBookDetail);

export const ConnectedLikeBokList = connect(
    state => state,
)(LikeBokList);

