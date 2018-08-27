import React from 'react';

export default class GanreMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Жанры</span>
            </h6>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="#">
                        Роман <span class="sr-only">(current)</span>
                    </a>
                </li>
                </ul>
            </div>
        );
    }
}
