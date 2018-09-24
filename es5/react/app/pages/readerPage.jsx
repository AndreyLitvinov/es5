import React from 'react';
import { connect } from 'react-redux';
import { readerStatuses } from '../constants/readerConstants';
import readerActions from '../store/actions/readerActions';
import Loader from '../components/loader';

class ReaderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            susubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { getReader } = this.props;
        getReader();
    }

    isValid(){
        const { firstName, lastName, address } = this.state;
        return firstName && lastName && address;
    }
        

    componentDidUpdate(prevProps, prevState, snapshot){
        const { reader: { status: prevReaderStatus } } = prevProps;
        const { reader } = this.props;
        
        if(prevReaderStatus != reader.status){
            if(reader.status == readerStatuses.READY){
                this.setState({
                    ...reader.info
                })
            }
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { saveReader, reader } = this.props;
        const { firstName, lastName, address } = this.state;

        this.setState({ susubmitted: true });

        if(this.isValid){
            saveReader(Object.assign(reader.info, { firstName, lastName, address }));
        }
    }

    render() {
        const { firstName, lastName, address, susubmitted } = this.state;
        const { reader: { status } } = this.props;
        
        const isLoading = status == readerStatuses.NOT || status == readerStatuses.PROCESS || status == readerStatuses.UPDATE;

        return (
                <form name="form" onSubmit={this.handleSubmit} >
                    {isLoading ? <Loader/> : 
                        <div>
                            <div className="form-group">
                                <label for="firstName">Имя</label>
                                <input type="text" className={susubmitted && !firstName ? 'form-control is-invalid' : 'form-control'} id="firstName" name="firstName" placeholder="имя" onChange={this.handleChange} value={firstName}/>
                                <div className="invalid-feedback">
                                    Пожалуйста, введите имя.
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="lastName">Фамилия</label>
                                <input type="text" className={susubmitted && !lastName ? 'form-control is-invalid' : 'form-control'} id="lastName" name="lastName" placeholder="фамилия" onChange={this.handleChange} value={lastName}/>
                                <div className="invalid-feedback">
                                    Пожалуйста, введите фамилию.
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Адрес</label>
                                <input type="text" className={susubmitted && !address ? 'form-control is-invalid' : 'form-control'} id="address" name="address" placeholder="адрес" onChange={this.handleChange} value={address}/>
                                <div className="invalid-feedback">
                                    Пожалуйста, введите адресс.
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={!this.isValid()}>Сохранить</button>
                        </div> 
                    }
                </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { reader } = state;
    return {
        reader
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getReader: () => dispatch(readerActions.get()),
    saveReader: (readerInfo) => dispatch(readerActions.update(readerInfo))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReaderPage)
