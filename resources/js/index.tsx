import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store';
import { storageAvailable } from './utils';
import { setAuthToken, getLoggedinUser, preparedLogin } from './actions';

const view: React.FunctionComponent = () => (
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
    ReactDOM.render(view, document.getElementById('app'));
}
