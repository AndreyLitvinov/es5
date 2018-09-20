import basketLinesService from '../../services/basketLinesService';
import basketLinesConstants from '../../constants/basketLinesConstants';


const basketLinesActions = {
    getAll,
    update,
    remove
};

function getAll() {
    return dispatch => {
        dispatch(request());

        basketLinesService.getAll()
            .then(
                lines => dispatch(success(lines)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: basketLinesConstants.GET_REQUEST } }
    function success(lines) { return { type: basketLinesConstants.GET_SUCCESS, lines } }
    function failure(error) { return { type: basketLinesConstants.GET_FAILURE, error } }
}


function update(lineId, count) {
    return dispatch => {
        dispatch(request(lineId));

        basketLinesService.update(lineId, count)
            .then(
                lineId => dispatch(success(lineId)),
                error => dispatch(failure(error))
            );
    };

    function request(lineId) { return { type: basketLinesConstants.UPDATE_COUNT_REQUEST, lineId } }
    function success(line) { return { type: basketLinesConstants.UPDATE_COUNT_SUCCESS, lineId } }
    function failure(error) { return { type: basketLinesConstants.UPDATE_COUNT_FAILURE, lineId, error } }
}


function remove(lineId) {
    return dispatch => {
        dispatch(request(lineId));

        basketLinesService.remove(lineId)
            .then(
                lineId => dispatch(success(lineId)),
                error => dispatch(failure(error))
            );
    };

    function request(lineId) { return { type: basketLinesConstants.REMOVE_REQUEST, lineId } }
    function success(lineId) { return { type: basketLinesConstants.REMOVE_SUCCESS, lineId } }
    function failure(error) { return { type: basketLinesConstants.REMOVE_FAILURE, lineId, error } }
}


export default basketLinesActions;