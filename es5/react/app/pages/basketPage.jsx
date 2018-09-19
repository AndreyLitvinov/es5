import React from 'react';
import { connect } from 'react-redux';
import basketLinesActions from '../store/actions/basketLinesActions';
import { basketLinesStatuses } from '../constants/basketLinesConstants';
import { NavLink, withRouter } from 'react-router-dom';
import Loader from '../components/loader';
import Pager from '../components/pager';
//import { UserComponent, AdminComponent } from '../components/authorization';
import basketActions from '../store/actions/basketActions';
import { basketStatuses } from '../constants/basketConstants';

class BasketPage extends React.Component {
    constructor(props) {
        super(props);
        const { getBasketLines } = this.props;
        getBasketLines();
    }

    addBookToBaskeClick(bookId){
        const { addBookToBasket } = this.props;
        return (e) => { addBookToBasket(bookId); };
    }

    handleChange(line) {
        return function(e){
            const { value } = e.target;
            line.count = value;
        };
    }

    componentDidMount() {
        const {
            basketLines
            , match:{
                params:{
                     page
                    , pagesize
                }
            }
        } = this.props;

        
        if (!booksList || booksList.status == basketLinesConstants.NOT) {
            getBooks(`books/${page || 1}/${pagesize || 3}/${genreId || 0}`);
        }

        if (genresList.status == basketLinesConstants.NOT) {
            getAllGenres();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // не понятно как запустить инициализацию до первого рендера! addBooksList
        // const { booksList: { status: booksListStatus }, genresList: { status: genresListStatus } } = this.props;
        const {
               basketList = { items:{}, status: basketLinesConstants.NOT }
             , match:{params:{ page, pagesize }}
            } = this.props;

        const { status: basketListStatus } = basketList;

        const { 
            basketList: { status: nextBasketListStatus }
            , match:{
                params:{ page: nextPage, pagesize: nextPagesize}
            } 
        } = nextProps;

        // если изменился статус любого списка
        if (basketListStatus != nextBasketListStatus) {
            // если в новом стейте все списке загруженны
            return nextBasketListStatus == basketLinesConstants.READY;
        }

        if(page != nextPage
        || pagesize != nextPagesize){
            getBasketList(`basket/${nextPage || 1}/${nextPagesize || 3}`);
        }
        
        return true;
    }

    render() {
        const { 
            basketLines = { lines, status: statusLines }
            ,  match:{
                params:{ page, pagesize}
            }
        } = this.props;
        
        const currentPageLines = basketLines.slice(page * pagesize, (page + 1) * pagesize);

        const isFeching = statusLines == basketLinesStatuses.GET_BASKET_REQUEST; 

        return (
            <div>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Книга</th>
                        <UserComponent>
                            <th scope="col">Кол-во</th>
                        </UserComponent>
                    </tr>
                </thead>
                <tbody>
                    {(isFeching ? <tr scope="row"><td colspan="4"><Loader/></td></tr>
                        : currentPageLines.length == 0 ? <tr scope="row"><td colspan="4"><div class="row justify-content-md-center">Нет данных</div></td></tr>
                        : currentPageLines.map((line, index) =>
                        <tr scope="row" key={line.id}>
                            <td>
                                {line.title}
                            </td>
                            <UserComponent>
                                <td>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <input type="number" value={line.count} onChange={} onBlur={this.handlerChangeCount(line.id)}></input>
                                        <button type="button" onClick={this.addBookToBaskeClick(line.id)} style={{display:'inline'}}  className="btn btn-outline-success"><i class="fas fa-plus-square"></i></button>
                                        <button type="button" onClick={this.addBookToBaskeClick(line.id)} style={{display:'inline'}}  className="btn btn-outline-success"><i class="fas fa-plus-square"></i></button>
                                    </div>
                                </td>
                            </UserComponent>
                        </tr>
                        )
                        )}
                </tbody>
            </table>
            <Pager page={page || 1} size={pagesize || 3} count={basketLines.length} urlTemplate={`/basket/page{page}/pagesize${pagesize || 3}`} />
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
        updateLine: (lineId, count) => dispatch(basketLinesActions.updateLine(lineId, count)),
        removeLine: (lineId) => dispatch(basketLinesActions.remove(lineId))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BasketPage))
