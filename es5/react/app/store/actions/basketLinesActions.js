import basketService from '../../services/basketService';
import basketLinesConstants from '../../constants/basketLinesConstants';


const basketLinesActions = {
    getAll,
    update,
    remove
};

function getAll() {
    return dispatch => {
        dispatch(request());

        basketService.getAll()
            .then(
                lines => dispatch(success(lines)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: basketLinesConstants.GET_REQUEST } }
    function success(lines) { return { type: basketLinesConstants.GETALL_SUCCESS, lines } }
    function failure(error) { return { type: basketLinesConstants.GETALL_FAILURE, error } }
}


function update(lineId, count) {
    return dispatch => {
        dispatch(request());

        basketService.update(lineId, count)
            .then(
                line => dispatch(success(line)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: basketLinesConstants.UPDATE_COUNT_REQUEST } }
    function success(line) { return { type: basketLinesConstants.UPDATE_COUNT_SUCCESS, line } }
    function failure(error) { return { type: basketLinesConstants.UPDATE_COUNT_FAILURE, lineId, error } }
}


function remove(lineId) {
    return dispatch => {
        dispatch(request());

        basketService.remove(lineId)
            .then(
                lineId => dispatch(success(lineId)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: basketLinesConstants.REMOVE_REQUEST } }
    function success(lineId) { return { type: basketLinesConstants.REMOVE_SUCCESS, lineId } }
    function failure(error) { return { type: basketLinesConstants.REMOVE_FAILURE, lineId, error } }
}


export default basketLinesActions;