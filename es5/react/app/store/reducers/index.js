import { combineReducers } from 'redux'
import books from './books'
import genres from './genres'

export default combineReducers({
    booksList: books,
    genresList: genres,
})