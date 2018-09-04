import listService from '../../services/listService';
import tmpListsConstants from '../../constants/tmpListsConstants';

const tmpListsActions = {
    addList,
    getByRequest,
};
function addList(key){
    return { type: tmpListsConstants.ADD, key};
}

function getByRequest(key, url) {
    return dispatch => {
        dispatch(request());

        listService.getByRequest(url)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: tmpListsConstants.REQUEST, key } }
    function success(data) { return { type: tmpListsConstants.SUCCESS, key, items: data.items, count: data.count } }
    function failure(error) { return { type: tmpListsConstants.FAILURE, error, key } }
}

export default tmpListsActions;