import React from 'react';
import basketActions from '../store/actions/basketActions';
import { basketStatuses } from '../constants/basketConstants';
import Loader from './loader';
import { connect } from 'react-redux';

const cardDiv = {
    color: 'rgba(255,255,255,.5)'
}

class Cart extends React.Component {
    constructor(props) {
        super(props);

        const { getBasket, basket } = this.props;
        getBasket();
    }

    render() {
        const { basket } = this.props;
        const isLoading = basket.status != basketStatuses.SUCCESS;
    return ( isLoading ? <Loader/> : <div style={cardDiv}>В корзине {basket.count} книг <i class="text-info fas fa-shopping-cart"></i></div> );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { basket, authorization } = state;
    return {
        basket,
        authorization
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBasket: () => dispatch(basketActions.get()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
