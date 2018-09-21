import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware  } from 'redux';
import rootReducer from './store/reducers';
import App from './components/app';
import thunk from 'redux-thunk';
import ErrorHandler from './components/errorHandler';

const store = createStore(rootReducer, applyMiddleware(thunk));

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <ErrorHandler>
                    <App/>
                </ErrorHandler>
            </Router>
        </Provider>,
        document.getElementById('app-react')
            );
        });
