import userCons, { userStatuses } from '../../constants/userConstants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: userStatuses.LOGGED_IN, user } : { status: userStatuses.NOT_LOGGED_IN };

const todos = (state = initialState, action) => {
    switch (action.type) {
        case userCons.LOGIN_REQUEST:
            return {
                 status: userStatuses.LOGGING_IN,
                 user: action.user
                }
        case userCons.LOGIN_SUCCESS:
            return {
                status: userStatuses.LOGGED_IN,
                user: action.user
               }
        case userCons.LOGIN_FAILURE:
            return {
                status: userStatuses.NOT_LOGGED_IN,
            }
        default:
            return state
    }
}

export default todos