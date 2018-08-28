import React from 'react';
import { connect } from 'react-redux';
import booksActions from '../store/actions/booksActions';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllBooks();
    }

    render() {
        const { books } = this.props;

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
                    {books.map((book, index) =>
                        <tr scope="row" key={book.id}>
                            <td>
                                {book.name}
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                {book.annotation}
                            </td>
                            <td>
                                {book.year}
                            </td>
                        </tr>
                        )}
                </tbody>
            </table>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { books } = state;
    return {
        books: books
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getAllBooks: () => dispatch(booksActions.getAll())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage)
