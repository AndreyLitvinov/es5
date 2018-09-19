import basketConstants, { basketLinesStatuses } from '../../constants/basketLinesConstants';

const basketLines = (state = { status: basketStatuses.BASKET_EMPTY, updatingLineId = 0, lines:[] }, action) => {
    switch (action.type) {
        case basketConstants.GET_REQUEST:
            return {
                status: basketLinesStatuses.GET_BASKET_REQUEST,
                lines: state.lines
            }
        case basketConstants.GET_SUCCESS:
            return {
                status: basketLinesStatuses.SUCCESS,
                lines: action.lines
            }
        case basketConstants.GET_FAILURE:
            return {
                status: basketLinesStatuses.BASKET_EMPTY,
                lines: [],
            }
            
        // update 
        case basketConstants.UPDATE_COUNT_REQUEST:
            return {
                status: basketLinesStatuses.UPDATE_BOOK_COUNT_IN_BASKET_REQUEST,
                items: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: true }): line)
            }
        case basketConstants.UPDATE_COUNT_SUCCESS:
            return {
                status: basketLinesStatuses.SUCCESS,
                items: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: false}): line)
            }
        case basketConstants.UPDATE_COUNT_FAILURE:
            return {
                status: basketLinesStatuses.SUCCESS,
                items: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: false, error: action.error }): line)
            }
        
        // remove
        case basketConstants.REMOVE_REQUEST:
            return {
                status: basketLinesStatuses.REMOVE_BOOK_FROM_BASKET_REQUEST,
                items: state.lines.filter(line => line.id != action.lineId)
            }
        case basketConstants.REMOVE_SUCCESS:
            return {
                status: basketLinesStatuses.SUCCESS,
                items: state.lines
            }
        case basketConstants.REMOVE_FAILURE:
            return {
                status: basketLinesStatuses.SUCCESS,
                items: state.lines
            }            
        default:
            return state
    }
}

export default basketLines