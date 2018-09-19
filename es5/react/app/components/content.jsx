import React from 'react';
import IndexPage from '../pages/indexPage';
import CartPage from '../pages/cartPage';
import { Route } from 'react-router-dom';
import { BasketPage } from '../pages/basketPage';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <Route exact path="(/|/books/page:page?/pagesize:pagesize?/genre:genreId?)" component={IndexPage} />
                <Route exact path="/books/page:page?/pagesize:pagesize?/genre:genreId?" component={IndexPage} />    
                <Route exact path="/basket/page:page?/pagesize:pagesize?" component={BasketPage} />    
            </main>
        );
    }
}
