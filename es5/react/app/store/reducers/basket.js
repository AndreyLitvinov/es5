import basketConstants, { basketStatuses } from '../../constants/basketConstants';

const books = (state = { status: basketStatuses.BASKET_EMPTY, count: 0 }, action) => {
    switch (action.type) {
        case basketConstants.GET_REQUEST:
            return {
                status: basketStatuses.GET_BASKET_REQUEST,
                count: state.count
            }
        case basketConstants.GET_SUCCESS:
            return {
                status: basketStatuses.SUCCESS,
                count: action.basket.count
            }
        case basketConstants.GET_FAILURE:
            return {
                status: basketStatuses.BASKET_EMPTY,
                count: 0,
            }

        // add book to basket
        case basketConstants.ADD_REQUEST:
            return {
                status: basketStatuses.ADD_BOOK_TO_BASKET_REQUEST,
                count: state.count
            }
        case basketConstants.ADD_SUCCESS:
            return {
                status: basketStatuses.SUCCESS,
                count: action.basket.count
            }
        case basketConstants.ADD_FAILURE:
            return {
                status: basketStatuses.BASKET_EMPTY,
                count: 0
            }
        default:
            return state
    }
}

export default books