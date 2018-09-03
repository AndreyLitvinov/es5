import listService from '../../services/listService';
import tmpListsConstants from '../../constants/tmpListsConstants';

const tmpListsActions = {
    addList,
    getByRequest,
};
function addList(key){
    return { type: tmpListsConstants.ADD, key};
}

function getByRequest(url) {
    return dispatch => {
        dispatch(request());

        listService.getByRequest(url)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: tmpListsConstants.REQUEST } }
    function success(items) { return { type: tmpListsConstants.SUCCESS, items } }
    function failure(error) { return { type: tmpListsConstants.FAILURE, error } }
}

export default tmpListsActions;