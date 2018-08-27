import React from 'react';
import Header from './header';
import Menu from './menu';
import Content from './content';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Menu />
                        <Content />
                     </div>
                 </div>
            </div>
        );
    }
}
