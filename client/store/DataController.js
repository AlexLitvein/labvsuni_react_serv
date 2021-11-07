import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import statusRdcr from '../rdcrs/status/rdcr';
import { setError, setLoaded, setLoading } from '../rdcrs/status/acts';
import { remote_data } from './remoteData';
import { GET_SENS_DATA, dataSetsRdcr, setDataSet, setPath } from '../dataRdcrs/paths';
const { call, put, takeLatest, delay } = require('redux-saga/effects');

const rootReducer = combineReducers({
    chartData: dataSetsRdcr,
    status: statusRdcr
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const MyStore = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

function* fetchSensData(act) { // act = { date, count, func }
    // console.log('fetchSensData', act);
    try {
        // yield put(setLoading());
        const receivedData = yield remote_data[act.payload.date].slice(0,act.payload.range);
        // console.log('receivedData', receivedData);
        const data = yield call(act.payload.func, receivedData);
        yield delay(1000);
        yield put(setDataSet( data )); //{ data }
        // yield put(setLoaded());
    } catch (e) {
        yield put(setError(e.message));
    }
};

function* sagaWatcher() {
    console.log('sagaWatcher');
    yield takeLatest(GET_SENS_DATA, fetchSensData);
}

sagaMiddleware.run(sagaWatcher);
export default MyStore;

