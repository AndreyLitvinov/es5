import React from 'react';
import IndexPage from '../pages/indexPage';
import { Route, Switch } from 'react-router-dom';
import BasketPage from '../pages/basket/basketPage';
import ReaderPage from '../pages/readerPage';
import OrdersPage from '../pages/librarian/orders';
import OrderPage from '../pages/librarian/order';
import { UserRoute, LibrarianRoute } from './authorization';
import ErrorHandler from './errorHandler';

const UserRoute_BasketPage = UserRoute(BasketPage);
const UserRoute_ReaderPage = UserRoute(ReaderPage);
const LibrarianRoute_OrdersPage = LibrarianRoute(OrdersPage);
const LibrarianRoute_OrderPage = LibrarianRoute(OrderPage);

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <ErrorHandler>
                    <Switch>
                        <Route exact path="/" component={IndexPage} />
                        <Route path="/books/page:page?/pagesize:pagesize?/genre:genreId?" component={IndexPage} />    
                        <Route exact path="/basket" component={UserRoute_BasketPage} />
                        <Route path="/basket/page:page?/pagesize:pagesize?/" component={UserRoute_BasketPage} />
                        <Route path="/reader/" component={UserRoute_ReaderPage} />
                        <Route exact path="/orders" component={LibrarianRoute_OrdersPage} />
                        <Route path="/orders/page:page?/pagesize:pagesize?/" component={LibrarianRoute_OrdersPage} />
                        <Route exact path="/order/userid:userId" component={LibrarianRoute_OrderPage} />
                        <Route path="/order/userid:userId/page:page?/pagesize:pagesize?/" component={LibrarianRoute_OrderPage} />
                    </Switch>  
                </ErrorHandler>
            </main>
        );
    }
}
