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
        const { getBasketLines } = this.props;

        this.updateLine = this.updateLine.bind(this);
        this.removeLine = this.removeLine.bind(this);
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

    updateLine(line){
        const { updateLine } = this.props
        updateLine(line.id, line.count)
    }

    removeLine(line){
        const { removeLine } = this.props
        removeLine(line.id)
    }

    render() {
        const { 
            basketLines:{ lines, status: statusLines }
            ,  match:{
                params:{ page=1, pagesize=3}
            }
        } = this.props;
        
        const currentPageLines = lines.slice((page - 1) * pagesize, page * pagesize);

        const isFeching = statusLines == basketLinesStatuses.GET_BASKET_REQUEST; 

        return (
            <div>
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
                        <BasketLine  key={line.id} line={line} update={this.updateLine} remove={this.removeLine}/>)
                        )}
                </tbody>
            </table>
            <Pager page={page || 1} size={pagesize || 3} count={lines.length} urlTemplate={`/basket/page{page}/pagesize${pagesize || 3}`} />
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
        removeLine: (lineId) => dispatch(basketLinesActions.remove(lineId))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BasketPage))
