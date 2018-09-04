import React from 'react';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row justify-content-md-center"><div class="loader"></div></div>
        );
    }
}
