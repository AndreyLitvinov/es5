import { combineReducers } from 'redux';
import books from './books';
import genres from './genres';
import tmpLists from './tmpLists';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    booksList: books,
    genresList: genres,
    tmpLists: tmpLists,
    filter: visibilityFilter
})