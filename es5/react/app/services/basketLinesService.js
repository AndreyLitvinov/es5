import apiConstants from '../constants/apiConstants';
import 'whatwg-fetch';
import authHeader from './authorizationHelper';
import handler from './handlers';

const basketLinesService = {
    getAll,
    update,
    remove
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader()
        },
    };

    return fetch(apiConstants.URL + 'basket/items', requestOptions)
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

    return fetch(apiConstants.URL + 'basket/update', requestOptions)
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

    return fetch(apiConstants.URL + 'basket/remove', requestOptions)
        .then(handler.response, handler.error);
}

export default basketLinesService;
