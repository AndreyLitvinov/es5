import React from 'react';
import Login from './login';
import Cart from './card';
import { UserComponent } from './authorization';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <div className="col-md-9 mr-auto">
                    <a class="navbar-brand mr-0" href="#">Library</a>
                </div>

                <div className="col-md-auto">
                    <UserComponent>
                        <Cart />
                    </UserComponent>
                </div>
                <div className="col-md-auto">
                    <Login />
                </div>
                
            </nav>
        );
    }
}
