import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import RouterWithHeader from './RouterWithHeader';
import { Footer } from './Footer';
import Header from './Header';
import AlertView from '../AlertView';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <AlertView />
                    <RouterWithHeader />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
