import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { fetchTimeLine } from "./actions";
import { rootReducer } from "./reducers";
import { App } from "./components/App";

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const view = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (document.getElementById('app')) {
    render(view, document.getElementById('app'));

    store.dispatch(fetchTimeLine());
}
