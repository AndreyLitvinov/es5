import apiConstants from '../constants/apiConstants';
import 'whatwg-fetch';

const authorizationService = {
    login,
    logout 
};

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },

        body: JSON.stringify({username, password})
    };

    return fetch(apiConstants.URL + 'user/authenticate', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            if(user && user.token){
                localStorage.setItem('user', JSON.stringify(user));
            }
             return user;
        });
}

function logout(username, password) {
    localStorage.removeItem('user');
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

export default authorizationService;