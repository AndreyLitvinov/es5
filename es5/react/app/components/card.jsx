import React from 'react';
import basketActions from '../store/actions/basketActions';
import { basketStatuses } from '../constants/basketConstants';
import { basketLinesStatuses } from '../constants/basketLinesConstants';
import Loader from './loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const cardDiv = {
    color: 'rgba(255,255,255,.5)'
}

class Cart extends React.Component {
    constructor(props) {
        super(props);

        const { getBasket, basket } = this.props;
        getBasket();
    }

    shouldComponentUpdate(nextProps, nextState){
        const { basketLinesStatus: newBasketLinesStatus } = nextProps;
        const { basketLinesStatus } = this.props;
        const { getBasket} = this.props;

        if(newBasketLinesStatus != basketLinesStatus){
            if(newBasketLinesStatus == basketLinesStatuses.SUCCESS){
                getBasket();
            }
        }
    }

    render() {
        const { basket } = this.props;
        const isLoading = basket.status != basketStatuses.SUCCESS;
        return ( isLoading ? <Loader/> : <div style={cardDiv} className="navbar-nav"><Link to="/basket" className="nav-link">В корзине {basket.count} книг <i class="text-info fas fa-shopping-cart"></i></Link></div> );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { basket, authorization, basketLines: {status: basketLinesStatus} } = state;
    return {
        basket,
        basketLinesStatus,
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
