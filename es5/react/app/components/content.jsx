import React from 'react';
import IndexPage from '../pages/indexPage';
import CartPage from '../pages/cartPage';
import { Route, Switch } from 'react-router-dom';
import BasketPage from '../pages/basket/basketPage';
import ReaderPage from '../pages/readerPage';
import { UserRoute } from './authorization';
import ErrorHandler from './errorHandler';

const UserRoute_BasketPage = UserRoute(BasketPage);
const UserRoute_ReaderPage = UserRoute(ReaderPage);

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
                    </Switch>  
                </ErrorHandler>
            </main>
        );
    }
}
