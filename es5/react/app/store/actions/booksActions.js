import booksService from '../../services/booksService';
import booksConstants from '../../constants/booksConstants';

const booksActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        booksService.getAll()
            .then(
                books => dispatch(success(books)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: booksConstants.GETALL_REQUEST } }
    function success(books) { return { type: booksConstants.GETALL_SUCCESS, books } }
    function failure(error) { return { type: booksConstants.GETALL_FAILURE, error } }
}

export default booksActions;