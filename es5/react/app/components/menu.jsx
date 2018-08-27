import React from 'react';
import GanreMenu from './ganreMenu';
import UserMenu from './userMenu';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <GanreMenu />
                    <UserMenu />
                </div>
            </nav>
        );
    }
}
