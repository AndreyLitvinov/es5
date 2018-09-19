import { combineReducers } from 'redux';
import books from './books';
import genres from './genres';
import tmpLists from './tmpLists';
import visibilityFilter from './visibilityFilter';
import authorization from './authorization';
import basket from './basket';
import basketLines from './basketLines';

export default combineReducers({
    booksList: books,
    genresList: genres,
    tmpLists: tmpLists,
    filter: visibilityFilter,
    authorization,
    basket,
    basketLines
})