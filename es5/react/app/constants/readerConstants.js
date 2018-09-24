const readerConstants = {
    GET_REQUEST: 'READER_GET_REQUEST',
    GET_SUCCESS: 'READER_GET_SUCCESS',
    GET_FAILURE: 'READER_GET_FAILURE',

    UPDATE_REQUEST: 'READER_UPDATE_REQUEST',
    UPDATE_SUCCESS: 'READER_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'READER_UPDATE_FAILURE',
};

const readerStatuses = {
    NOT: 'NOT_DATA',
    PROCESS: 'GET_DATA_IN_PROCESS',
    READY: 'DATA_READY',

    UPDATE: 'UPDATE_IN_PROCESS',
    ERROR: 'DATA_ERROR'
};

export default readerConstants;
export { readerStatuses };


// using import { readerConstants } from '../constants';
