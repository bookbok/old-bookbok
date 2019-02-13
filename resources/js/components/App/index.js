import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './Routes';
import Header from './Header';
import FlashMessages from '../FlashMessages';
import Footer from './Footer';
import { Loading } from '../shared/Loading';


class App extends Component {
    render() {
        return this.props.isPrepared ? (
            <BrowserRouter>
                <div>
                    <Header />
                    <FlashMessages />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        ) :
        <Loading />;
    }
}

App.propTypes = {
    isPrepared: PropTypes.bool.isRequired,
}

export default connect(
    state => ({ isPrepared: state.isPrepared })
)(App);
