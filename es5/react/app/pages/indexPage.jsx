import React from 'react';
import { connect } from 'react-redux';
import listActions from '../store/actions/tmpListsActions';
import genresActions from '../store/actions/genresActions';
import persistenListStatuses from '../constants/persistenListStatuses';
import { withRouter } from 'react-router-dom';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        const { booksList, addBooksList } = this.props;
        if(!booksList){
            addBooksList();
        }
        
    }

    componentDidMount() {
        const {booksList, genresList, getBooks, getAllGenres} = this.props;

        
        if (booksList.status == persistenListStatuses.NOT) {
            getBooks('books/1/3/');
        }

        if (!genresList.status == persistenListStatuses.NOT) {
            getAllGenres();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { booksList: { status: booksListStatus }, genresList: { status: genresListStatus } } = this.props;
        const { booksList: { status: nextBooksListStatus }, genresList: { status: nextGenresListStatus } } = nextProps;
        // если изменился статус любого списка
        if (booksListStatus != nextBooksListStatus
            || genresListStatus != nextGenresListStatus) {
            // если в новом стейте все списке загруженны
            return nextBooksListStatus == persistenListStatuses.READY
                && nextGenresListStatus == persistenListStatuses.READY;
        }

        return true;
    }

    render() {
        const { booksList: { items: books = [], status: booksListStatus }
        , genresList: { items: genres, status: genresListStatus }
        , match:{params:{genreId: genreId}} } = this.props;
        const isFeching = booksListStatus != persistenListStatuses.READY || genresListStatus != persistenListStatuses.READY; 

        console.log(genreId);
        return (
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
                    {(isFeching ? <tr scope="row"><td colspan="4"><div class="row justify-content-md-center"><div class="loader"></div></div></td></tr>
                        : books.filter(book => !genreId || book.genreId == genreId ).map((book, index) =>
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
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { tmpLists, genresList } = state;
    return {
        booksList: tmpLists.find(list => list.key == 'IndexPage'),
        genresList
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addBooksList: () => dispatch(listActions.addList("IndexPage")),
        getBooks: (url) => dispatch(listActions.getByRequest(url)),
        getAllGenres: () => dispatch(genresActions.getAll())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage))
