import genresConstants from '../../constants/genresConstants';
import persistenListStatuses from '../../constants/persistenListStatuses';

const genres = (state = { status: persistenListStatuses.NOT, items: [] }, action) => {
    switch (action.type) {
        case genresConstants.GETALL_REQUEST:
            return {
                status: persistenListStatuses.PROCESS,
                items: state.genres
            }
        case genresConstants.GETALL_SUCCESS:
            return {
                status: persistenListStatuses.READY,
                items: [...action.genres]
            }
        case genresConstants.GETALL_FAILURE:
            return {
                status: persistenListStatuses.NOT,
                items: state.genres
            }
        default:
            return state
    }
}

export default genres