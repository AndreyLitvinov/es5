import React from 'react';
import { connect } from 'react-redux';
import listActions from '../../store/actions/tmpListsActions';
import persistenListStatuses from '../../constants/persistenListStatuses';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../../components/loader';
import Pager from '../../components/pager';
import { LibrarianComponent } from '../../components/authorization';
        
class OrdersPage extends React.Component {
    constructor(props) {
        super(props);
        
        const { ordersList, addOrdersList } = this.props;
        if(!ordersList){
            addOrdersList();
        }
    }

    componentDidMount() {
        const {
            getOrders
            , match:{
                params:{
                     page
                    , pagesize
                }
            }
        } = this.props;

        getOrders(`librarian/orders/${page || 1}/${pagesize || 3}`);
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        const {
             ordersList = { items:{}, status: persistenListStatuses.NOT }
             , getOrders
             , match:{params:{genreId, page, pagesize}}
            } = this.props;

        const { status: orderListStatus } = ordersList;

        const { 
            ordersList: { status: nextOrdersListStatus }
            , match:{
                params:{ genreId: nextGenreId, page: nextPage, pagesize: nextPagesize }
            }
        } = nextProps;

        // если изменился статус любого списка
        if (orderListStatus != nextOrdersListStatus) {
            // если в новом стейте все списке загруженны
            return nextOrdersListStatus == persistenListStatuses.READY;
        }

        if(nextGenreId != genreId
        || page != nextPage
        || pagesize != nextPagesize){
            getOrders(`librarian/orders/${nextPage || 1}/${nextPagesize || 3}`);
        }
        
        return false;
    }

    render() {
        const { 
            ordersList:{ items, status: statusOrdersList }
            ,  match:{
                params:{ page=1, pagesize=3}
            }
        } = this.props;

        const isFeching = statusOrdersList == persistenListStatuses.PROCESS; 

        return (
            <div>
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Пользователь</th>
                            <LibrarianComponent>
                                <th scope="col"></th>
                            </LibrarianComponent>
                        </tr>
                    </thead>
                    <tbody>
                        {(isFeching ? <tr scope="row"><td colspan="4"><Loader/></td></tr>
                            : items.length == 0 ? <tr scope="row"><td colspan="4"><div class="row justify-content-md-center">Нет данных</div></td></tr>
                            : items.map((line, index) =>
                            <tr>
                                <td>{line.title}</td>
                                <td><Link to={`order/userid${line.userId}`}><i class="fas fa-th-list"></i></Link></td>
                            </tr>)
                            )}
                    </tbody>
                </table>
                <Pager page={page || 1} size={pagesize || 3} count={items.length} urlTemplate={`/orders/page{page}/pagesize${pagesize || 3}`} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { tmpLists } = state;
    return {
        ordersList: tmpLists.find(list => list.key == 'OrdersPage') || {items: [], status: persistenListStatuses.NOT},
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addOrdersList: () => dispatch(listActions.addList("OrdersPage")),
        getOrders: (url) => dispatch(listActions.getByRequest("OrdersPage", url)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersPage))
