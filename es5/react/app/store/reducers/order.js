import orderConstants, { orderStatuses } from '../../constants/orderConstants';

const ORDERLines = (state = { status: orderStatuses.ORDER_EMPTY, updatingLineId: 0, lines:[] }, action) => {
    switch (action.type) {
        case orderConstants.GET_REQUEST:
            return {
                status: orderStatuses.GET_ORDER_REQUEST,
                lines: state.lines
            }
        case orderConstants.GET_SUCCESS:
            return {
                status: orderStatuses.SUCCESS,
                lines: action.lines
            }
        case orderConstants.GET_FAILURE:
            return {
                status: orderStatuses.ORDER_EMPTY,
                lines: [],
            }
            
        // update 
        case orderConstants.UPDATE_COUNT_REQUEST:
            return {
                status: orderStatuses.UPDATE_BOOK_COUNT_IN_ORDER_REQUEST,
                lines: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: true }): line)
            }
        case orderConstants.UPDATE_COUNT_SUCCESS:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: false}): line)
            }
        case orderConstants.UPDATE_COUNT_FAILURE:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines.map(line => line.id == action.lineId ? Object.assign({}, line, { updating: false, error: action.error }): line)
            }
        
        // remove
        case orderConstants.REMOVE_REQUEST:
            return {
                status: orderStatuses.REMOVE_BOOK_FROM_ORDER_REQUEST,
                lines: state.lines.filter(line => line.id != action.lineId)
            }
        case orderConstants.REMOVE_SUCCESS:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines
            }
        case orderConstants.REMOVE_FAILURE:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines
            }            

        // give
        case orderConstants.GIVE_ALL_REQUEST:
        return {
            status: orderStatuses.GIVE_ALL_BOOKS_REQUEST,
            lines: []
        }
        case orderConstants.GIVE_ALL_SUCCESS:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines
            }
        case orderConstants.GIVE_ALL_FAILURE:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines,
                error: action.error
            }            

        case orderConstants.GIVE_REQUEST:
            return {
                status: orderStatuses.GIVE_BOOK_REQUEST,
                lines: state.lines.filter(line => line.id != action.lineId)
            }
        case orderConstants.GIVE_SUCCESS:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines
            }
        case orderConstants.GIVE_FAILURE:
            return {
                status: orderStatuses.SUCCESS,
                lines: state.lines,
                error: action.error
            }            
        default:
            return state
    }
}

export default ORDERLines