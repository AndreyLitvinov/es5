import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showLoginForm: false};
    }

    loginClick(){
        this.setState({
            showLoginForm: true
        });
    }

    render() {
        return (
            <div>
                <ul class="navbar-nav px-1">
                    <li class="nav-item text-nowrap">
                        <button class="nav-link" onClick={this.loginClick}>Войти</button>
                    </li>
                </ul>
            </div>
        );
    }
}
