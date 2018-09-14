const basketConstants = {
    GET_REQUEST: 'BASKET_GET_REQUEST',
    GET_SUCCESS: 'BASKET_GET_SUCCESS',
    GET_FAILURE: 'BASKET_GET_FAILURE',

    ADD_REQUEST: 'ADD_BOOK_TO_BASKET_GET_REQUEST',
    ADD_SUCCESS: 'ADD_BOOK_TO_BASKET_GET_SUCCESS',
    ADD_FAILURE: 'ADD_BOOK_TO_BASKET_GET_FAILURE'
};

const basketStatuses = {
    BASKET_EMPTY: 'BASKET_EMPTY',
    GET_BASKET_REQUEST: 'GET_BASKET_REQUEST',
    ADD_BOOK_TO_BASKET_REQUEST: 'ADD_BOOK_TO_BASKET_REQUEST',
    SUCCESS: 'BASKET_REQUEST_SUCCESS',
};

export default basketConstants;
export { basketStatuses }

// using import { basketConstants } from '../constants';
