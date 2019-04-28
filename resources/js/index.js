import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store';
import { storageAvailable } from './utils';
import { setAuthToken, getLoggedinUser, preparedLogin } from './actions';

const view = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (storageAvailable('localStorage') && localStorage.getItem('token')) {
    store.dispatch(setAuthToken(localStorage.getItem('token')));
    store.dispatch(getLoggedinUser());
} else {
    store.dispatch(preparedLogin());
}

if (document.getElementById('app')) {
    render(view, document.getElementById('app'));
}
