import React from 'react';
import { connect } from 'react-redux';
import orderActions from '../../store/actions/orderActions';
import { orderStatuses } from '../../constants/orderConstants';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/loader';
import Pager from '../../components/pager';
import { UserComponent } from '../../components/authorization';
import OrderLine from './orderLine';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lineChangedId : false,
            orderSuccess: false
        };

        this.updateLine = this.updateLine.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.lineChanged = this.lineChanged.bind(this);
        this.orderBooks = this.orderBooks.bind(this);
    }

    componentDidMount() {
        const {
            getOrderLines
            , match:{
                params:{
                    userId
                }
            }
        } = this.props;

        getOrderLines(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        const { order:{ status: prevStatusLines } } = prevProps;
        const { order:{ status: statusLines } } = this.props;

        if(prevStatusLines != statusLines){
            if(prevStatusLines == orderStatuses.ORDER_BOOKS_REQUEST
                && statusLines == orderStatuses.SUCCESS){
                this.setState({ orderSuccess: true });
            }
        }
    }

    updateLine(line){
        const { updateLine } = this.props;
        const { lineChangedId } = this.state;
        updateLine(line.id, line.count);

        if(lineChangedId == line.id){
            this.setState({ lineChangedId: 0 });
        }
    }

    lineChanged(line){
        this.setState({ lineChangedId: line.id });
    }

    removeLine(line){
        const { removeLine } = this.props
        removeLine(line.id)
    }

    orderBooks(){
        const { order } = this.props;
        order();
    }

    render() {
        const { 
            order:{ lines, status: statusLines }
            ,  match:{
                params:{ page=1, pagesize=3}
            }
        } = this.props;
        
        const { lineChangedId, orderSuccess } = this.state;

        const currentPageLines = lines.slice((page - 1) * pagesize, page * pagesize);

        const isFeching = statusLines == orderStatuses.GET_ORDER_REQUEST; 

        return (
            <div>
                { orderSuccess && <div  class="alert alert-success" role="alert">Заказ книг оформлен, необходимо забрать книги у библиотекаря</div> }
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Книга</th>
                            <UserComponent>
                                <th scope="col">Кол-во</th>
                                <th scope="col"></th>
                            </UserComponent>
                        </tr>
                    </thead>
                    <tbody>
                        {(isFeching ? <tr scope="row"><td colspan="4"><Loader/></td></tr>
                            : currentPageLines.length == 0 ? <tr scope="row"><td colspan="4"><div class="row justify-content-md-center">Нет данных</div></td></tr>
                            : currentPageLines.map((line, index) =>
                            <OrderLine  key={line.id} line={line} update={this.updateLine} remove={this.removeLine} changed={this.lineChanged}/>)
                            )}
                    </tbody>
                </table>
                <Pager page={page || 1} size={pagesize || 3} count={lines.length} urlTemplate={`/order/page{page}/pagesize${pagesize || 3}`} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { order } = state;
    return {
        order
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getOrderLines: (userId) => dispatch(orderActions.getAll(userId)),
        updateLine: (lineId, count) => dispatch(orderActions.update(lineId, count)),
        removeLine: (lineId) => dispatch(orderActions.remove(lineId)),
        
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderPage))
