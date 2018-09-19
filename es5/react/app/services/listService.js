import apiConstants from '../constants/apiConstants';
import authHeader from './authorizationHelper';
import 'whatwg-fetch';
import handler from './handlers';

const listService = {
    getByRequest
};

function getByRequest(requestUrl) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...authHeader(),
            
        },
    };

    return fetch(apiConstants.URL + requestUrl, requestOptions)
        .then(handler.response, handler.error);
}

export default listService;
