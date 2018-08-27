import React from 'react';
import { Link } from 'react-router-dom';

export default class GanreMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Личный кабинет</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <Link to="/cart" className="nav-link">Моя карточка читателя</Link>
                </li>
                </ul>
            </div>
        );
    }
}
