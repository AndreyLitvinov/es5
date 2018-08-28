import { combineReducers } from 'redux'
import todos from './todos'
import books from './books'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    books,
    todos,
    visibilityFilter
})