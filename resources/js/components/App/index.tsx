import * as React from 'react';
import { RootState } from 'resource-types';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './Routes';
import Header from './Header';
import FlashMessages from '../FlashMessages';
import Footer from './Footer';
import { Loading } from '../shared/Loading';

interface Props {
    isPrepared: boolean;
}

class App extends React.Component<Props> {
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
        ) : (
            <Loading />
        );
    }
}

export default connect((state: RootState) => ({ isPrepared: state.isPrepared }))(App);
