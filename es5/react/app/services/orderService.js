import apiConstants from '../constants/apiConstants';
import 'whatwg-fetch';
import authHeader from './authorizationHelper';
import handler from './handlers';

const orderService = {
    getAll,
    update,
    remove,
    giveLine,
    giveAllLines
};

function getAll(userId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
    };

    return fetch(apiConstants.URL + `librarian/order/${userId}`, requestOptions)
        .then(handler.response, handler.error);
}


function update(lineId, count) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
        body: JSON.stringify({ Id: lineId, count})
    };

    return fetch(apiConstants.URL + 'librarian/update', requestOptions)
        .then(handler.response, handler.error);
}

function remove(lineId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
        body: JSON.stringify({ Id: lineId })
    };

    return fetch(apiConstants.URL + 'librarian/remove', requestOptions)
        .then(handler.response, handler.error);
}

function giveLine(lineId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
        body: JSON.stringify({ lineId })
    };

    return fetch(apiConstants.URL + 'librarian/giveline', requestOptions)
        .then(handler.response, handler.error);
}

function giveAllLines(userId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
        body: JSON.stringify({ userId })
    };

    return fetch(apiConstants.URL + 'librarian/giveallline', requestOptions)
        .then(handler.response, handler.error);
}

export default orderService;
