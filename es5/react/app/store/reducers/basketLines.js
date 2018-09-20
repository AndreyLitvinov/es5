import basketLinesConstants, { basketLinesStatuses } from '../../constants/basketLinesConstants';

const basketLines = (state = { status: basketLinesStatuses.BASKET_EMPTY, updatingLineId: 0, lines:[] }, action) => {
    switch (action.type) {
        case basketLinesConstants.GET_REQUEST:
            return {
                status: basketLinesStatuses.GET_BASKET_REQUEST,
                lines: state.lines
            }
        case basketLinesConstants.GET_SUCCESS:
            return {
                status: basketLinesStatuses.SUCCESS,
                lines: action.lines
            }
        case basketLinesConstants.GET_FAILURE:
            return {
                status: basketLinesStatuses.BASKET_EMPTY,
                lines: [],
            }
            
        // update 
        case basketLinesConstants.UPDATE_COUNT_REQUEST:
            return {
                status: basketLinesStatuses.UPDATE_BOOK_COUNT_IN_BASKET_REQUEST,
                lines: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: true }): line)
            }
        case basketLinesConstants.UPDATE_COUNT_SUCCESS:
            return {
                status: basketLinesStatuses.SUCCESS,
                lines: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: false}): line)
            }
        case basketLinesConstants.UPDATE_COUNT_FAILURE:
            return {
                status: basketLinesStatuses.SUCCESS,
                lines: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: false, error: action.error }): line)
            }
        
        // remove
        case basketLinesConstants.REMOVE_REQUEST:
            return {
                status: basketLinesStatuses.REMOVE_BOOK_FROM_BASKET_REQUEST,
                lines: state.lines.filter(line => line.id != action.lineId)
            }
        case basketLinesConstants.REMOVE_SUCCESS:
            return {
                status: basketLinesStatuses.SUCCESS,
                lines: state.lines
            }
        case basketLinesConstants.REMOVE_FAILURE:
            return {
                status: basketLinesStatuses.SUCCESS,
                lines: state.lines
            }            
        default:
            return state
    }
}

export default basketLines