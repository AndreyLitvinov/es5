import apiConstants from '../constants/apiConstants';
import 'whatwg-fetch';

const booksService = {
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

    return fetch(apiConstants.URL + 'books', requestOptions)
        .then(handleResponse, handleError);
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}

export default booksService;