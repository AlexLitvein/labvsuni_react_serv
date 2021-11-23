import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import statusRdcr from '../rdcrs/status/rdcr';
import { setError, setLoaded, setLoading } from '../rdcrs/status/acts';
// import { remote_data } from './remoteData';
import { GET_SENS_DATA, dataSetsRdcr, setDataSet, setPath } from '../dataRdcrs/paths';
const { call, put, takeLatest, delay } = require('redux-saga/effects');

async function fetchJson(url, date, range, stride) {
    let data = {};
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ startData: date, range: range, stride: stride })
    });

    if (res.ok) { // если HTTP-статус в диапазоне 200-299        
        data = await res.json(); // получаем тело ответа (см. про этот метод ниже)
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }

    return data;
}

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
        // const receivedData = yield remote_data[act.payload.date].slice(0, act.payload.range);
        const receivedData = yield fetchJson('http://localhost:3000/weather/getSensData', act.payload.date, act.payload.range, act.payload.stride);
        // console.log('receivedData', receivedData);
        const data = yield call(act.payload.func, receivedData);
        // yield delay(1000);
        yield put(setDataSet(data)); //{ data }
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

