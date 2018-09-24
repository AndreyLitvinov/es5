import readerService from '../../services/readerService';
import readerConstatns from '../../constants/readerConstants';

const readerActions = {
    get,
    update,
};

function get() {
    return dispatch => {
        dispatch(request());

        readerService.get()
            .then(
                reader => dispatch(success(reader)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: readerConstatns.GET_REQUEST } }
    function success(reader) { return { type: readerConstatns.GET_SUCCESS, reader } }
    function failure(error) { return { type: readerConstatns.GET_FAILURE, error } }
}


function update(reader) {
    return dispatch => {
        dispatch(request());

        readerService.update(reader)
            .then(
                reader => dispatch(success(reader)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: readerConstatns.UPDATE_REQUEST } }
    function success(reader) { return { type: readerConstatns.UPDATE_SUCCESS, reader } }
    function failure(error) { return { type: readerConstatns.UPDATE_FAILURE, error } }
}

export default readerActions;
