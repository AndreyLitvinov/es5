import React from 'react';

export default class LoginModalForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const  { show, successFunc, cancelFunc } = this.props;
        
        return (
            <div className="modal fade" style={!show ? 'display: none;' : 'display:blok;'}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" dataDismiss="modal" ariaLabel="Close">
                        <span ariaHidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Вход</h4>
                    </div>
                    <div className="modal-body">
                        <p>One fine body&hellip;</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={}>Закрыть</button>
                        <button type="button" className="btn btn-primary">Войти</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
