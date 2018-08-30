import React from 'react';
import { connect } from 'react-redux';
import genresActions from '../store/actions/genresActions';
import persistenListStatuses from '../constants/persistenListStatuses';
import { NavLink, withRouter } from 'react-router-dom';

class GanreMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.genresList.status == persistenListStatuses.NOT) {
            this.props.getAllGenres();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { genresList: { status: genresListStatus } } = this.props;
        const { genresList: { status: nextGenresListStatus } } = nextProps;
        // если изменился статус любого списка
        if (genresListStatus != nextGenresListStatus) {
            // если в новом стейте все списке загруженны
            return nextGenresListStatus == persistenListStatuses.READY;
        }
        // warning: помни про shouldComponentUpdate !
        return true;
    }

    render() {
        const { genresList: { items: genres, status: genresListStatus } } = this.props;
        const isFeching = genresListStatus != persistenListStatuses.READY; 
        return (
            <div>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Жанры</span>
            </h6>
                {(isFeching ? <div class="row justify-content-md-center"><div class="loader"></div></div>
                    : 
                    <ul class="nav flex-column">
                            <li class="nav-item">
                                <NavLink to="/" exact activeClassName="nav-link active" className="nav-link">Все</NavLink>
                            </li>
                        {genres.map((genre, index) =>
                            <li class="nav-item" key={genre.id}>
                                <NavLink to={`/${genre.id}`} exact activeClassName="nav-link active" className="nav-link">{genre.name}</NavLink>
                            </li>
                     )}
                    </ul>
                )}    
            </div>
            );
        }
    }
    
const mapStateToProps = (state, ownProps) => {
    const { genresList } = state;
    return {
        genresList
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getAllGenres: () => dispatch(genresActions.getAll())
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(GanreMenu))

