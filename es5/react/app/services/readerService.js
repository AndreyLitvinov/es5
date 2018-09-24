import apiConstants from '../constants/apiConstants';
import authHeader from './authorizationHelper';
import handler from './handlers';
import 'whatwg-fetch';

const readerService = {
    get,
    update
};

function get() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
    };

    return fetch(apiConstants.URL + 'reader', requestOptions)
        .then(handler.response, handler.error);
}

function update(reader) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
        credentials: "include" ,
        body: JSON.stringify(reader)
    };

    return fetch(apiConstants.URL + 'reader/update', requestOptions)
        .then(handler.response, handler.error);
}

export default readerService;
