import React from 'react';
import { connect } from 'react-redux';
import authorizationActions from '../store/actions/authorizationActions';
import { authorizationStatuses } from '../constants/authorizationConstants';
import Loader from './loader';

const modal = {
        zIndex: 1,
        display: 'block',
}

class LoginModalForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            susubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const { login } = this.props;
        this.setState({ susubmitted: true });

        if (username && password) {
            login(username, password);
        }
    }

    defaultLogin(username){
        return () => this.setState({ username, password: 'BGTnhyMJU100' });
    }

    render() {
        const  { cancelFunc, authorization:{ status, error } } = this.props;
        const  { submitted, username, password } = this.state;
        const isLogining = status == authorizationStatuses.LOGGING_IN;
        const isLogined = status == authorizationStatuses.LOGGED_IN;
        const isError = status == authorizationStatuses.NOT_LOGGED_IN && error;

        return (
            <div className="modal" role="dialog" style={modal}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вход</h4>
                            { !isLogining && 
                                <button type="button" className="close" onClick={cancelFunc}>
                                    <span ariaHidden="true">&times;</span>
                                </button>
                            }
                        </div>
                        <div className="modal-body">
                       
                            { isError && 
                                    <div class="alert alert-danger">
                                        <strong>{ error }</strong>
                                    </div>
                            }
                            { isLogining ? <Loader/>: 
                                isLogined ? <p>Вход выполнен</p> :
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button type="button" onClick={this.defaultLogin('admin')} className="btn btn-secondary">Админ</button>
                                        <button type="button" onClick={this.defaultLogin('librarian')} className="btn btn-secondary">Библиотекарь</button>
                                        <button type="button" onClick={this.defaultLogin('user')} className="btn btn-secondary">Читатель</button>
                                    </div>
                                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                        <label htmlFor="username">Логин</label>
                                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                        {submitted && !username &&
                                            <div className="help-block text-danger">Обязательное поле</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                        <label htmlFor="password">Пароль</label>
                                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                        {submitted && !password &&
                                            <div className="help-block text-danger">Обязательное поле</div>
                                        }
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={cancelFunc}>Закрыть</button>
                                        <button type="button" className="btn btn-primary" type="submit">Войти</button>
                                    </div>
                                </form> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { authorization } = state;
    return {
        authorization
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    //logout: () => dispatch(authorizationActions.logout()),
    login: (username, password) => dispatch(authorizationActions.login(username, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginModalForm)
