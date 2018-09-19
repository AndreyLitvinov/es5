import apiConstants from '../constants/apiConstants';
import authHeader from './authorizationHelper';
import handler from './handlers';

import 'whatwg-fetch';

const basketService = {
    get,
    add
};

function get() {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader(),
        },
        credentials: "include" 
    };

    return fetch(apiConstants.URL + 'basket', requestOptions)
        .then(handler.response, handler.error);
}

function add(bookId) {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader(),
        },
        credentials: "include" 
    };

    return fetch(`${apiConstants.URL}basket/add/${bookId}`, requestOptions)
        .then(handler.response, handler.error);
}

export default basketService;
