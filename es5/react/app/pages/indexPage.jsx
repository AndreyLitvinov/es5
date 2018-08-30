import React from 'react';
import { connect } from 'react-redux';
import booksActions from '../store/actions/booksActions';
import genresActions from '../store/actions/genresActions';
import persistenListStatuses from '../constants/persistenListStatuses';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (this.props.booksList.status == persistenListStatuses.NOT) {
            this.props.getAllBooks();
        }

        if (!this.props.genresList.status == persistenListStatuses.NOT) {
            this.props.getAllGenres();
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

        return false;
    }

    render() {
        const { booksList: { items: books, status: booksListStatus }, genresList: { items: genres, status: genresListStatus } } = this.props;
        const isFeching = booksListStatus != persistenListStatuses.READY || genresListStatus != persistenListStatuses.READY; 
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
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { booksList, genresList } = state;
    return {
        booksList,
        genresList
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getAllBooks: () => dispatch(booksActions.getAll()),
    getAllGenres: () => dispatch(genresActions.getAll())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage)
