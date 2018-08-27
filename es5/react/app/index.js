import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import App from './components/app';

const store = createStore(rootReducer)

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App} />
            </Router>
        </Provider>,
        document.getElementById('app-react')
            );
        });
