import React from 'react';

export default class ErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorText: "" };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true, errorText: error.message });
    }
  
    render() {
        const {hasError, errorText} = this.state;
        if (hasError) {
            return (
            <div style={ { textAlign: "center" } }>
                <h1>Произошла неизвестная ошибка, обновите страницу!</h1>
                <div id="accordion">
                    <div className="card">
                        <div className="card-header">
                            <a className="card-link" data-toggle="collapse" href="#collapseOne">
                            Подробнее
                            </a>
                        </div>
                        <div id="collapseOne" className="collapse" data-parent="#accordion">
                            <div className="card-body">
                            {errorText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
      }
      return this.props.children;
    }
  }