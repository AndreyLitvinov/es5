import tmpListsConstants from '../../constants/tmpListsConstants';
import persistenListStatuses from '../../constants/persistenListStatuses';

const tmpLitst = (state = [], action) => {
    switch (action.type) {
        case tmpListsConstants.ADD:
            return [...state, {
                status: persistenListStatuses.NOT,
                items: []
            }]
        case tmpListsConstants.REQUEST:
            return state.some(list => list.key == action.key) 
            ? state.map(list => list.key == action.key ? {
                status: persistenListStatuses.PROCESS,
                items: list.items
            }: list) 
            : [...state, {
                status: persistenListStatuses.PROCESS,
                items: []
            }]
        case tmpListsConstants.SUCCESS:
            return state.map(list => list.key == action.key ? {
                status: persistenListStatuses.READY,
                items: [ ...action.items ]
            }: list)  
        case tmpListsConstants.FAILURE:
            return state.map(list => list.key == action.key ? {
                status: persistenListStatuses.NOT,
                items: []
            }: list)
        default:
            return state
    }
}

export default tmpLitst