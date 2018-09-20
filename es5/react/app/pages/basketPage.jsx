import React from 'react';
import { connect } from 'react-redux';
import basketLinesActions from '../store/actions/basketLinesActions';
import { basketLinesStatuses } from '../constants/basketLinesConstants';
import { NavLink, withRouter } from 'react-router-dom';
import Loader from '../components/loader';
import Pager from '../components/pager';
import { UserComponent } from '../components/authorization';


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


class BasketLine extends React.Component {
    constructor(props) {
        super(props);
        
        const { line } = this.props;
        this.state = {
            count: line.count,
            timer: null
        }

        this.plusBookToBasketClick = this.plusBookToBasketClick.bind(this);
        this.minusBookFromBasketClick = this.minusBookFromBasketClick.bind(this);
        this.removeBookFromBasketClick = this.removeBookFromBasketClick.bind(this);
    }

    startTimerSave(count) {
        const { update, line } = this.props;
        const { timer } = this.state;

        if(timer) clearTimeout(timer);
        if(update)
            this.setState({ timer : setTimeout(() => update(Object.assign(line, { count })), 3000) });
    }

    plusBookToBasketClick(){
        let { count: currentCount } = this.state;
        this.setState({ count: ++currentCount });
        this.startTimerSave(currentCount);
    }

    minusBookFromBasketClick(){
        let { count: currentCount } = this.state;
        this.setState({ count: --currentCount });
        this.startTimerSave(currentCount);
    }

    removeBookFromBasketClick(){
        const { remove, line } = this.props;
        const { count } = this.state;
        if(remove)
            remove(Object.assign(line, { count }));
    }

    contChange(e) {
        const { value } = e.target;
        this.setState({ count: value });
        this.startTimerSave(value);
    }

    render() {
        const { line } = this.props;
        const { count } = this.state;
        const isUpdating = !!line.updating;
        return (
            <tr scope="row">
                <td>
                    {line.title}
                </td>
                <UserComponent>
                    <td>
                        <div class="btn-group btn-group-sm" role="group">
                            <input type="number" value={count} onChange={(e) => this.contChange(e)} className="form-control" disabled={isUpdating}></input>
                            <button type="button" onClick={this.minusBookFromBasketClick} style={{display:'inline'}}  className="btn btn-outline-success" disabled={isUpdating}><i class="fas fa-minus-square"></i></button>
                            <button type="button" onClick={this.plusBookToBasketClick} style={{display:'inline'}}  className="btn btn-outline-success" disabled={isUpdating}><i class="fas fa-plus-square"></i></button>
                        </div>
                    </td>
                    <td>
                        <button type="button" onClick={this.removeBookFromBasketClick} style={{display:'inline'}} className="btn btn-outline-danger" disabled={isUpdating}><i class="fas fa-trash-alt"></i></button>
                    </td>
                </UserComponent>
            </tr>
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
