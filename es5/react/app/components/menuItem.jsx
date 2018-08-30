import React from 'react';
import { Route, Link } from 'react-router-dom';

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, to, exact } = this.props;
        return (
            <Route
                path={to}
                exact={exact}
                children={({ match }) => (
                    <Link to={to} className={match ? 'nav-link active' : 'nav-link'}>{label}</Link>
                )}
            />
        );
    }
}
