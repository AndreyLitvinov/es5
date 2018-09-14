const authorizationConstants = {
    LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

    LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'USER_LOGOUT_FAILURE',
};

export const authorizationStatuses = {
    NOT_LOGGED_IN: 'USER_NOT_LOGGED_IN',
    LOGGING_IN: 'USER_LOGGING_IN',
    LOGGED_IN: 'USER_LOGGED_IN',
}

export default authorizationConstants;
 
// using import { tmpListsConstants } from '../constants';
