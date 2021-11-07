// import MyGraph from "../classes/ChartObject";

export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_DATA_SET = 'SET_DATA_SET';
// export const SET_PATH = 'SET_PATH';
// export const SET_RESIZE_PATHS = 'SET_RESIZE_PATHS';
export const SET_TEXT = 'SET_TEXT';

export const setText = (payload) => {
    return {
        type: SET_TEXT,
        payload,
    }
};

export const setDataSet = (payload) => {
    return {
        type: SET_DATA_SET,
        payload,
    }
};

export const getSensData = (payload,) => { // date, count, func
    console.log('act getSensData');
    return {
        type: GET_SENS_DATA,
        payload,
    }
};

// набор данных: 
// [
//      { 
//           _id: ['2021-11-05', ...], 
//           t:   [21.2, ...],
//           p:   [36.9 ...],
//           h:   [12.5 ...]
//      },
//      ...
// ]
const initialState = {
    dataSets: [],
    text: { t1: 'text1', t2: 'text2' },
};

export const selDataSets = (state) => state.chartData.dataSets;
export const selText = (state) => state.chartData.text;

export function dataSetsRdcr(state = initialState, action) {
    console.log('pathRdcr', action);

    switch (action.type) {
        case SET_TEXT:
            // console.log('action.SET_ANI_PATH:', state.aniPaths);            
            return {
                ...state,
                text: { ...action.payload },
                // text: { ...state.text, ...action.payload },
            };

        case SET_DATA_SET:
            // console.log('action.SET_ANI_PATH:', state.aniPaths);           
            return {
                ...state,
                // dataSets: [...state.dataSets, action.payload],
                dataSets: [action.payload],
            };

        default:
            return state;
    }
}