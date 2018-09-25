import React from 'react';
import { connect } from 'react-redux';
import listActions from '../store/actions/tmpListsActions';
import genresActions from '../store/actions/genresActions';
import persistenListStatuses from '../constants/persistenListStatuses';
import { NavLink, withRouter } from 'react-router-dom';
import Loader from '../components/loader';
import Pager from '../components/pager';
import { UserComponent, AdminComponent } from '../components/authorization';
import basketActions from '../store/actions/basketActions';
import { basketStatuses } from '../constants/basketConstants';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        const { booksList, addBooksList } = this.props;
        if(!booksList){
            addBooksList();
        }
    }

    addBookToBaskeClick(bookId){
        const { addBookToBasket } = this.props;
        return (e) => { addBookToBasket(bookId); };
    }

    componentDidMount() {
        const {
            genresList
            , getBooks
            , getAllGenres
            , match:{
                params:{
                    genreId
                    , page
                    , pagesize
                }
            }
        }= this.props;

        getBooks(`books/${page || 1}/${pagesize || 3}/${genreId || 0}`);

        if (genresList.status == persistenListStatuses.NOT) {
            getAllGenres();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // не понятно как запустить инициализацию до первого рендера! addBooksList
        // const { booksList: { status: booksListStatus }, genresList: { status: genresListStatus } } = this.props;
        const {
               booksList = { items:{}, status: persistenListStatuses.NOT }
             , getBooks
             , genresList = { items:{}, status: persistenListStatuses.NOT }
             , match:{params:{genreId, page, pagesize}}
             , basket:{ status: basketStatus }
            } = this.props;

        const { status: booksListStatus } = booksList;
        const { status: genresListStatus } = genresList;

        const { 
            booksList: { status: nextBooksListStatus }
            , genresList: { status: nextGenresListStatus }
            , match:{
                params:{genreId: nextGenreId, page: nextPage, pagesize: nextPagesize}
            }
            , basket:{ status: nextBasketStatus } 
        } = nextProps;

        // если изменился статус любого списка
        if (booksListStatus != nextBooksListStatus
            || genresListStatus != nextGenresListStatus) {
            // если в новом стейте все списке загруженны
            return nextBooksListStatus == persistenListStatuses.READY
                && nextGenresListStatus == persistenListStatuses.READY
                || nextBooksListStatus == persistenListStatuses.PROCESS;
        }

        if(nextGenreId != genreId
        || page != nextPage
        || pagesize != nextPagesize){
            getBooks(`books/${nextPage || 1}/${nextPagesize || 3}/${nextGenreId || 0}`);
        }
        
        if(nextBasketStatus != basketStatus){
            return nextBasketStatus == basketStatuses.ADD_BOOK_TO_BASKET_REQUEST || nextBasketStatus == basketStatuses.SUCCESS;
        }

        return false;
    }

    render() {
        const { 
            booksList = { items:{}, status: persistenListStatuses.NOT }
            , genresList = { items:{}, status: persistenListStatuses.NOT }
            ,  match:{
                params:{genreId, page, pagesize}
            }
            , basket:{ status: basketStatus }
        } = this.props;
        
        const { items: books = [], status: booksListStatus } = booksList;
        const { items: genres, status: genresListStatus } = genresList;
        const isFeching = booksListStatus != persistenListStatuses.READY || genresListStatus != persistenListStatuses.READY; 

        return (
            <div>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Жанр</th>
                        <th scope="col">Аннотация</th>
                        <th scope="col">Год</th>
                        <UserComponent>
                            <th scope="col">
                            </th>
                        </UserComponent>
                        <AdminComponent>
                            <th scope="col">
                            </th>
                        </AdminComponent>
                    </tr>
                </thead>
                <tbody>
                    {(isFeching ? <tr scope="row"><td colspan="4"><Loader/></td></tr>
                        : books.length == 0 ? <tr scope="row"><td colspan="4"><div class="row justify-content-md-center">Нет данных</div></td></tr>
                        : books.map((book, index) =>
                        <tr scope="row" key={book.id}>
                            <td>
                                {book.name}
                            </td>
                            <td>
                                {genres.find(genre => genre.id == book.genreId) ? genres.find(genre => genre.id == book.genreId).name : ''}
                            </td>
                            <td>
                                {book.annotation}
                            </td>
                            <td>
                                {book.year}
                            </td>
                            <UserComponent>
                                <td>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button type="button" onClick={this.addBookToBaskeClick(book.id)} style={{display:'inline'}} disabled={basketStatus == basketStatuses.ADD_BOOK_TO_BASKET_REQUEST} className="btn btn-outline-success"><i class="fas fa-cart-plus"></i></button>
                                    </div>
                                </td>
                            </UserComponent>
                            <AdminComponent>
                                <td>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <NavLink to={`/book/edit/${book.id}`} className="btn btn-outline-success"><i class="fas fa-edit"></i></NavLink>
                                        <NavLink to={`/book/remove/${book.id}`} className="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></NavLink>
                                    </div>
                                </td>
                            </AdminComponent>
                        </tr>
                        )
                        )}
                </tbody>
            </table>
            <Pager page={page || 1} size={pagesize || 3} count={booksList.count} urlTemplate={`/books/page{page}/pagesize${pagesize || 3}/genre${genreId || 0}`} />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { tmpLists, genresList, filter, basket } = state;
    return {
        booksList: tmpLists.find(list => list.key == 'IndexPage'),
        genresList,
        filter,
        basket
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // ключем должен быть объект контроллера, как это сделать через weakmap?
        addBooksList: () => dispatch(listActions.addList("IndexPage")),
        getBooks: (url) => dispatch(listActions.getByRequest("IndexPage", url)),
        getAllGenres: () => dispatch(genresActions.getAll()),
        addBookToBasket:(bookId) => dispatch(basketActions.add(bookId)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage))
