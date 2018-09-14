import authorizationCons, { authorizationStatuses } from '../../constants/authorizationConstants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: authorizationStatuses.LOGGED_IN, user } : { status: authorizationStatuses.NOT_LOGGED_IN };

const authorization = (state = initialState, action) => {
    switch (action.type) {
        case authorizationCons.LOGIN_REQUEST:
            return {
                 status: authorizationStatuses.LOGGING_IN,
                 user: action.user
                }
        case authorizationCons.LOGIN_SUCCESS:
            return {
                status: authorizationStatuses.LOGGED_IN,
                user: action.user
               }
        case authorizationCons.LOGIN_FAILURE:
            return {
                status: authorizationStatuses.NOT_LOGGED_IN,
                error: action.error
            }
        case authorizationCons.LOGOUT_SUCCESS:
            return {
                status: authorizationStatuses.NOT_LOGGED_IN,
            }
        default:
            return state
    }
}

export default authorization