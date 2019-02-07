import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import Header from './Header';
import AlertView from '../AlertView';
import Footer from './Footer';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <AlertView />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
