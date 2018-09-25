import orderService from '../../services/orderService';
import orderConstants from '../../constants/orderConstants';


const orderActions = {
    getAll,
    update,
    remove,
    giveLine,
    giveAllLines
};

function getAll(userId) {
    return dispatch => {
        dispatch(request());

        orderService.getAll(userId)
            .then(
                lines => dispatch(success(lines)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderConstants.GET_REQUEST } }
    function success(lines) { return { type: orderConstants.GET_SUCCESS, lines } }
    function failure(error) { return { type: orderConstants.GET_FAILURE, error } }
}


function update(lineId, count) {
    return dispatch => {
        dispatch(request(lineId));

        orderService.update(lineId, count)
            .then(
                lineId => dispatch(success(lineId)),
                error => dispatch(failure(error))
            );
    };

    function request(lineId) { return { type: orderConstants.UPDATE_COUNT_REQUEST, lineId } }
    function success(lineId) { return { type: orderConstants.UPDATE_COUNT_SUCCESS, lineId } }
    function failure(error) { return { type: orderConstants.UPDATE_COUNT_FAILURE, lineId, error } }
}


function remove(lineId) {
    return dispatch => {
        dispatch(request(lineId));

        orderService.remove(lineId)
            .then(
                lineId => dispatch(success(lineId)),
                error => dispatch(failure(error))
            );
    };

    function request(lineId) { return { type: orderConstants.REMOVE_REQUEST, lineId } }
    function success(lineId) { return { type: orderConstants.REMOVE_SUCCESS, lineId } }
    function failure(error) { return { type: orderConstants.REMOVE_FAILURE, lineId, error } }
}

function giveLine(lineId) {
    return dispatch => {
        dispatch(request(lineId));

        orderService.giveLine(lineId)
            .then(
                lineId => dispatch(success(lineId)),
                error => dispatch(failure(error))
            );
    };

    function request(lineId) { return { type: orderConstants.ORDER_REQUEST, lineId } }
    function success(lineId) { return { type: orderConstants.ORDER_SUCCESS, lineId } }
    function failure(error) { return { type: orderConstants.ORDER_FAILURE, error } }
}

function giveAllLines(userId) {
    return dispatch => {
        dispatch(request(userId));

        orderService.giveLine(userId)
            .then(
                userId => dispatch(success(userId)),
                error => dispatch(failure(error))
            );
    };

    function request(userId) { return { type: orderConstants.ORDER_REQUEST, userId } }
    function success(userId) { return { type: orderConstants.ORDER_SUCCESS, userId } }
    function failure(error) { return { type: orderConstants.ORDER_FAILURE, error } }
}

export default orderActions;