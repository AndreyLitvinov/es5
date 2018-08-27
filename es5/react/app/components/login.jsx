import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul class="navbar-nav px-1">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#">Войти</a>
                </li>
            </ul>
        );
    }
}
