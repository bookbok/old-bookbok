import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from "./components/App";
import { store } from "./store";

const view = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (document.getElementById('app')) {
    render(view, document.getElementById('app'));
}
