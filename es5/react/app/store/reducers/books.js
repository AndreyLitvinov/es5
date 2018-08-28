import booksConstants from '../../constants/booksConstants';

const books = (state = [], action) => {
    switch (action.type) {
        case booksConstants.GETALL_SUCCESS:
            return [ ...action.books ]
        default:
            return state
    }
}

export default books