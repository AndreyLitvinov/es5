import React from 'react';
import LoginModalForm from './loginModalForm';
import { authorizationStatuses } from '../constants/authorizationConstants';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import authorizationActions from '../store/actions/authorizationActions';


const buttonLink = {
    cursor: 'pointer',
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showLoginFormUserClick: false};

        this.loginClick = this.loginClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
        this.closeLoginForm = this.closeLoginForm.bind(this);
    }

    loginClick(){
        this.setState({
            showLoginFormUserClick: true
        });
    }

    logoutClick(){
        const { logout } = this.props;
        this.setState({
            showLoginFormUserClick: false
        });
        logout();
    }

    closeLoginForm(){
        this.setState({
            showLoginFormUserClick: false
        });
    }

    render() {
        const { showLoginFormUserClick } = this.state;
        const { authorization:{ status }  } = this.props;
        const showLoginForm = showLoginFormUserClick && (status == authorizationStatuses.NOT_LOGGED_IN || status == authorizationStatuses.LOGGING_IN);

        return (
            <div>
                <ul class="navbar-nav px-1">
                    <li class="nav-item text-nowrap">
                    {
                        status == authorizationStatuses.NOT_LOGGED_IN 
                        ? <a class="nav-link" style={buttonLink} onClick={this.loginClick}>Войти</a>
                        : <a class="nav-link" style={buttonLink} onClick={this.logoutClick}>Выйти</a>
                    }
                    </li>
                </ul>
               { showLoginForm && <LoginModalForm cancelFunc={this.closeLoginForm} /> }
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { authorization } = state;
    return {
        authorization
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(authorizationActions.logout()),
    //login: (username, password) => dispatch(authorizationActions.login(username, password))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login))
