import authorizationConstants from '../../constants/authorizationConstants';
import authorizationService from '../../services/authorizationService';

const authorizationActions = {
    login,
    logout,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        authorizationService.login(username, password)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request(user) { return { type: authorizationConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authorizationConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authorizationConstants.LOGIN_FAILURE, error } }
}

function logout(){
    authorizationService.logout();
    return { type: authorizationConstants.LOGOUT_SUCCESS, user: {} }
}

export default authorizationActions;