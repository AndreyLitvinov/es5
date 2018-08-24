import controller from './controllers/TestController';
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", function () {
    fetch('serviceconfig/')
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            class Clock extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = { date: new Date() };
                }

                componentDidMount() {
                    this.timerID = setInterval(
                        () => this.tick(),
                        1000
                    );
                }

                componentWillUnmount() {
                    clearInterval(this.timerID);
                }

                tick() {
                    this.setState({
                        date: new Date()
                    });
                }

                render() {
                    return (
                        <div>
                            <h1>Hello, world!</h1>
                            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                        </div>
                    );
                }
            }

            class Toggle extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = { isToggleOn: true };

                    // This binding is necessary to make `this` work in the callback
                    //this.handleClick = this.handleClick.bind(this);
                }

                // This syntax ensures `this` is bound within handleClick.
                // Warning: this is *experimental* syntax.
                /*handleClick = () => {
                    console.log('this is:', this);
                }*/

                handleClick() {
                    console.log('this is:', this);
                }

                /*
                 handleClick() {
                    this.setState(prevState => ({
                        isToggleOn: !prevState.isToggleOn
                    }));
                }
                */
                render() {
                    return (
                        <div>
                            <button onClick={this.handleClick}>
                                {this.state.isToggleOn ? 'ON' : 'OFF'}
                            </button>
                            <button onClick={(e) => this.handleClick(e)}>
                                Click me
                            </button>
                        </div>
                    );
                }
            }

            ReactDOM.render(
                <div><Clock /><Toggle /></div>,
                document.getElementById('content')
            );
        })
        .catch(ex => document.getElementById('content').innerHTML = '<h4 class="text-danger">' + ex + '</h4>');
});
