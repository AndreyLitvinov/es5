import booksConstants from '../../constants/booksConstants';
import persistenListStatuses from '../../constants/persistenListStatuses';

const books = (state = { status: persistenListStatuses.NOT, items: [] }, action) => {
    switch (action.type) {
        case booksConstants.GETALL_REQUEST:
            return {
                status: persistenListStatuses.PROCESS,
                items: state.books
            }
        case booksConstants.GETALL_SUCCESS:
            return {
                status: persistenListStatuses.READY,
                items: [...action.books]
            }
        case booksConstants.GETALL_FAILURE:
            return {
                status: persistenListStatuses.NOT,
                items: state.books
            }
        default:
            return state
    }
}

export default books