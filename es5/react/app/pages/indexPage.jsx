import React from 'react';
import { connect } from 'react-redux';
import listActions from '../store/actions/tmpListsActions';
import genresActions from '../store/actions/genresActions';
import persistenListStatuses from '../constants/persistenListStatuses';
import { withRouter } from 'react-router-dom';
import Loader from '../components/loader';
import Pager from '../components/pager';


class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        const { booksList, addBooksList } = this.props;
        if(!booksList){
            addBooksList();
        }
    }

    componentDidMount() {
        const {booksList, genresList, getBooks, getAllGenres, match:{params:{genreId, page}}} = this.props;

        
        if (!booksList || booksList.status == persistenListStatuses.NOT) {
            getBooks(`books/${page || 1}/3/${genreId || 0}`);
        }

        if (genresList.status == persistenListStatuses.NOT) {
            getAllGenres();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // не понятно как запустить инициализацию до первого рендера! addBooksList
        // const { booksList: { status: booksListStatus }, genresList: { status: genresListStatus } } = this.props;
        const { booksList = { items:{}, status: persistenListStatuses.NOT }, getBooks, genresList = { items:{}, status: persistenListStatuses.NOT }, match:{params:{genreId, page}}} = this.props;
        const { status: booksListStatus } = booksList;
        const { status: genresListStatus } = genresList;

        const { booksList: { status: nextBooksListStatus }, genresList: { status: nextGenresListStatus }, match:{params:{genreId: nextGenreId, page: nextPage}} } = nextProps;
        // если изменился статус любого списка
        if (booksListStatus != nextBooksListStatus
            || genresListStatus != nextGenresListStatus) {
            // если в новом стейте все списке загруженны
            return nextBooksListStatus == persistenListStatuses.READY
                && nextGenresListStatus == persistenListStatuses.READY
                || nextBooksListStatus == persistenListStatuses.PROCESS;
        }

        if(nextGenreId != genreId
        || page != nextPage){
            getBooks(`books/${nextPage || 1}/3/${nextGenreId || 0}`);
        }
        
        return true;
    }

    render() {
        const {booksList = { items:{}, status: persistenListStatuses.NOT }, genresList = { items:{}, status: persistenListStatuses.NOT },  match:{params:{genreId, page, pagesize}}} = this.props;
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
                        </tr>
                        )
                        )}
                </tbody>
            </table>
            <Pager page={page || 1} count={booksList.count} urlTemplate={`/books/{page}/${pagesize || 3}/${genreId || 0}`} />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { tmpLists, genresList, filter } = state;
    return {
        booksList: tmpLists.find(list => list.key == 'IndexPage'),
        genresList,
        filter
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // ключем должен быть объект контроллера, как это сделать через weakmap?
        addBooksList: () => dispatch(listActions.addList("IndexPage")),
        getBooks: (url) => dispatch(listActions.getByRequest("IndexPage", url)),
        getAllGenres: () => dispatch(genresActions.getAll()),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage))
