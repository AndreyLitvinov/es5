import genresService from '../../services/genresService';
import genresConstants from '../../constants/genresConstants';


const genresActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        genresService.getAll()
            .then(
                genres => dispatch(success(genres)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: genresConstants.GETALL_REQUEST } }
    function success(genres) { return { type: genresConstants.GETALL_SUCCESS, genres } }
    function failure(error) { return { type: genresConstants.GETALL_FAILURE, error } }
}

export default genresActions;