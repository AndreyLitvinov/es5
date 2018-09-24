import React from 'react';
import { connect } from 'react-redux';
import basketLinesActions from '../../store/actions/basketLinesActions';
import { basketLinesStatuses } from '../../constants/basketLinesConstants';
import { NavLink, withRouter } from 'react-router-dom';
import Loader from '../../components/loader';
import Pager from '../../components/pager';
import { UserComponent } from '../../components/authorization';
import BasketLine from './basketLine';

class BasketPage extends React.Component {
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
            getBasketLines
            , match:{
                params:{
                     page
                    , pagesize
                }
            }
        } = this.props;

        getBasketLines();
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        const { basketLines:{ status: prevStatusLines } } = prevProps;
        const { basketLines:{ status: statusLines } } = this.props;

        if(prevStatusLines != statusLines){
            if(prevStatusLines == basketLinesStatuses.ORDER_BOOKS_REQUEST
                && statusLines == basketLinesStatuses.SUCCESS){
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
            basketLines:{ lines, status: statusLines }
            ,  match:{
                params:{ page=1, pagesize=3}
            }
        } = this.props;
        
        const { lineChangedId, orderSuccess } = this.state;

        const currentPageLines = lines.slice((page - 1) * pagesize, page * pagesize);

        const isFeching = statusLines == basketLinesStatuses.GET_BASKET_REQUEST; 

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
                            <BasketLine  key={line.id} line={line} update={this.updateLine} remove={this.removeLine} changed={this.lineChanged}/>)
                            )}
                    </tbody>
                </table>
                <Pager page={page || 1} size={pagesize || 3} count={lines.length} urlTemplate={`/basket/page{page}/pagesize${pagesize || 3}`} />
                <div>
                    <button type="button" onClick={this.orderBooks} style={{display:'inline'}} className="btn btn-outline-success" disabled={lineChangedId != 0 || lines.length == 0}>Получить книги</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { basketLines } = state;
    return {
        basketLines
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBasketLines: () => dispatch(basketLinesActions.getAll()),
        updateLine: (lineId, count) => dispatch(basketLinesActions.update(lineId, count)),
        removeLine: (lineId) => dispatch(basketLinesActions.remove(lineId)),
        order: () => dispatch(basketLinesActions.order())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BasketPage))
