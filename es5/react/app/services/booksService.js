import apiConstants from '../constants/apiConstants';
import 'whatwg-fetch';
import handler from './handlers';

const booksService = {
    getAll
};

function getAll() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    };

    return fetch(apiConstants.URL + 'books', requestOptions)
        .then(handler.response, handler.error);
}

export default booksService;
