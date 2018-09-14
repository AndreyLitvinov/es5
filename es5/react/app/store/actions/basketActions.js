import basketService from '../../services/basketService';
import basketConstants from '../../constants/basketConstants';

const booksActions = {
    get,
    add
};

function get() {
    return dispatch => {
        dispatch(request());

        basketService.get()
            .then(
                basket => dispatch(success(basket)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: basketConstants.GET_REQUEST } }
    function success(basket) { return { type: basketConstants.GET_SUCCESS, basket } }
    function failure(error) { return { type: basketConstants.GET_FAILURE, error } }
}

function add(bookId) {
    return dispatch => {
        dispatch(request());

        basketService.add(bookId)
            .then(
                basket => dispatch(success(basket)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: basketConstants.ADD_REQUEST } }
    function success(basket) { return { type: basketConstants.ADD_SUCCESS, basket } }
    function failure(error) { return { type: basketConstants.ADD_FAILURE, error } }
}

export default booksActions;