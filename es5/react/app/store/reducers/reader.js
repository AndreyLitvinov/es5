import readerConstants, { readerStatuses } from '../../constants/readerConstants';

const reader = (state = { status: readerStatuses.NOT, info: {} }, action) => {
    switch (action.type) {
        case readerConstants.GET_REQUEST:
            return {
                status: readerStatuses.PROCESS,
                info: null
            }
        case readerConstants.GET_SUCCESS:
            return {
                status: readerStatuses.READY,
                info: action.reader
            }
        case readerConstants.GET_FAILURE:
            return {
                status: readerStatuses.ERROR,
                info: null,
                error: action.error
            }

        // update reader info
        case readerConstants.UPDATE_REQUEST:
            return {
                status: readerStatuses.UPDATE,
                info: state.info
            }
        case readerConstants.UPDATE_SUCCESS:
            return {
                status: readerStatuses.READY,
                info: action.reader
            }
        case readerConstants.UPDATE_FAILURE:
            return {
                status: readerStatuses.ERROR,
                info: null,
                error: action.error
            }
        default:
            return state
    }
}

export default reader