import apiConstants from '../constants/apiConstants';
import 'whatwg-fetch';
import handler from './handlers';

const genresService = {
    getAll
};

function getAll() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    };

    return fetch(apiConstants.URL + 'genres', requestOptions)
        .then(handler.response, handler.error);
}

export default genresService;
