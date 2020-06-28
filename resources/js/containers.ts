import { connect } from 'react-redux';
import { BookDetailView } from './components/BookDetailView';
import { UsersView } from './components/UsersView';

export const ConnectedBookDetail = connect(state => state)(BookDetailView);

export const ConnectedUsersView = connect(state => state)(UsersView);
