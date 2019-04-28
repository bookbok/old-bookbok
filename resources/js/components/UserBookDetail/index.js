import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as ResourceTypes from '../../resource-types';
import { withRouter } from 'react-router-dom';
import {
    fetchUserBookDetail,
    fetchUser,
    requestUpdateUserBookStatus,
    deleteBok,
    loading,
    loaded,
} from '../../actions';
import { store } from '../../store';
import { isEmpty, getAuthUser, toLines } from '../../utils';

import { Loading } from '../shared/Loading';
import UserDetailBok from './UserDetailBok';
import { FloatUserInfo } from '../shared/user/FloatUserInfo';
import { BookInfo } from '../shared/book/BookInfo';
import BokModal from './BokModal';
import ReviewModal from './ReviewModal';
import { MyPageTabs } from '../shared/user/MyPageTabs';
import UserBookInfo from './UserBookInfo';
import BackButtonArea from '../shared/BackButtonArea';

const fetchUserBookDetailActions = (userId, userBookId) => {
    store.dispatch(loading());
    Promise.all([fetchUserBookDetail(userId, userBookId), fetchUser(userId)]).then(() => {
        store.dispatch(loaded());
    });
};

class UserBookDetail extends Component {
    constructor(props) {
        super(props);
        this.readingStatuses = [
            { id: 0, name: 'none', intl: '未設定' },
            { id: 5, name: 'wanted', intl: '欲しい' },
            { id: 10, name: 'unread', intl: '未読' },
            { id: 15, name: 'reading', intl: '読書中' },
            { id: 20, name: 'readed', intl: '読了' },
        ];

        this.state = {
            isSpoiler: false,
            readingStatus: 0,
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteBok = this.handleDeleteBok.bind(this);
    }

    componentDidMount() {
        this.userId = parseInt(this.props.match.params.userId);
        this.userBookId = parseInt(this.props.match.params.userBookId);
        fetchUserBookDetailActions(this.userId, this.userBookId);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const userBook = nextProps.userBookDetail;
        if (
            userBook &&
            (userBook.is_spoiler != prevState.isSpoiler ||
                userBook.reading_status != prevState.readingStatus)
        ) {
            return {
                isSpoiler: userBook.is_spoiler,
                readingStatus: userBook.reading_status,
            };
        }
        return null;
    }

    componentDidUpdate() {
        if (!this.props.userBookDetail) {
            return;
        }
        // URLハッシュ(#boks-4等)を元にbokの元に移動する
        window.location.hash = window.decodeURIComponent(window.location.hash);
        const scrollToAnchor = () => {
            const hashParts = window.location.hash.split('#');
            if (hashParts.length === 2) {
                const hash = hashParts[1];
                const element = document.getElementById(`${hash}`);
                if (element) {
                    element.scrollIntoView();
                }
            }
        };
        scrollToAnchor();
    }

    // idを元にサーバーに送信する値を返す
    getStatusNameFromId(id) {
        return this.readingStatuses.filter(val => val.id == id)[0].name;
    }

    handleUpdate(e) {
        if (isEmpty(getAuthUser())) {
            return this.props.history.push('/login');
        }

        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [name]: value });

        let body = {
            is_spoiler: this.state.isSpoiler,
            reading_status: this.getStatusNameFromId(this.state.readingStatus),
        };
        if (name === 'reading_status') {
            body = { ...body, reading_status: this.getStatusNameFromId(value) };
        } else if (name === 'is_spoiler') {
            body = { ...body, is_spoiler: value };
        }

        requestUpdateUserBookStatus(this.userId, this.userBookId, body).then(() => {
            // TODO: Bootstrap alertで更新したことを通知する
        });
    }

    buttonDisplayCheck(loginUser, userId) {
        if (loginUser && loginUser.id == userId) {
            return true;
        }
        return false;
    }

    handleDeleteBok(currentBok) {
        if (!currentBok) {
            return;
        }

        deleteBok(currentBok.id, this.props.userBookDetail.boks, currentBok);
    }

    render() {
        if (this.props.loading || !this.props.userBookDetail || !this.props.user) {
            return <Loading />;
        }

        const userBook = this.props.userBookDetail;
        const boks = userBook.boks.map(bok => (
            <div className="boks-bok" key={bok.id} id={`boks-${bok.id}`}>
                <UserDetailBok bok={bok} handleDeleteBok={this.handleDeleteBok} />
                <div className="boks-relation-line" />
            </div>
        ));

        const isModalView = this.buttonDisplayCheck(getAuthUser(), this.userId);
        const { book, review } = userBook;
        const user = this.props.user;
        return (
            <div className="page-content-wrap row row-book-detail">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <MyPageTabs userId={this.userId} />
                            <BackButtonArea to={`/users/${this.userId}/user_books`} />

                            <UserBookInfo
                                readingStatuses={this.readingStatuses}
                                handleUpdate={this.handleUpdate}
                                userId={userBook.user_id}
                                readingStatus={this.state.readingStatus}
                                isSpoiler={this.state.isSpoiler}
                            />
                            <BookInfo book={book} />

                            <hr />
                            <h3 className="mt-5">
                                レビュー
                                <div className="float-right">
                                    <ReviewModal
                                        key={review.updated_at}
                                        isModalView={isModalView}
                                        review={review}
                                    />
                                </div>
                            </h3>
                            <div className="mt-4">
                                <h4>{review.title}</h4>
                                {toLines(review.body)}
                            </div>

                            <hr />
                            <h3 className="mt-5">
                                Boks
                                <div className="float-right">
                                    <BokModal isModalView={isModalView} />
                                </div>
                            </h3>
                            <div className="mt-4">{boks}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserBookDetail.propTypes = {
    history: ResourceTypes.ROUTER,
    match: ResourceTypes.MATCHER,
    loading: PropTypes.bool,
    userBookDetail: ResourceTypes.USER_BOOK,
    user: ResourceTypes.USER,
};

import { connect } from 'react-redux';
import { fetchOnIdUpdateDecorator } from '../../decorators/FetchOnIdUpdateDecorator';

export default withRouter(
    connect(state => state)(
        fetchOnIdUpdateDecorator(({ userId, userBookId }) => {
            fetchUserBookDetailActions(userId, userBookId);
        })(UserBookDetail)
    )
);
