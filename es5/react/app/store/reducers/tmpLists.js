import tmpListsConstants from '../../constants/tmpListsConstants';
import persistenListStatuses from '../../constants/persistenListStatuses';

const tmpLitst = (state = [], action) => {
    switch (action.type) {
        case tmpListsConstants.ADD:
            return [...state, {
                key: action.key,
                status: persistenListStatuses.NOT,
                count: 0,
                items: []
            }]
        case tmpListsConstants.REQUEST:
            return state.some(list => list.key == action.key) 
            ? state.map(list => list.key == action.key ? Object.assign({}, list, { status: persistenListStatuses.PROCESS }): list) 
            : [...state, {
                key: action.key,
                status: persistenListStatuses.PROCESS,
                count: 0,
                items: []
            }]
        case tmpListsConstants.SUCCESS:
            return state.map(list => list.key == action.key ? Object.assign({}, list, { status: persistenListStatuses.READY, items: action.items, count: action.count }) : list)  
        case tmpListsConstants.FAILURE:
            return state.map(list => list.key == action.key ? Object.assign({}, list, { status: persistenListStatuses.NOT }) : list)
        default:
            return state
    }
}

export default tmpLitst