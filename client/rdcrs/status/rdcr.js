import * as actions from "./acts"

export const STATUS = {
    EMPTY: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3,
};

const initialState = {
    status: STATUS.EMPTY,
    error: null,
};

export default function statusRdcr(state = initialState, action) {
    switch (action.type) {
        case action.SET_EMPTY_STATUS:
            return {
                ...state,
                status: STATUS.EMPTY,
            };

        case action.SET_LOADING_STATUS:
            return {
                ...state,
                status: STATUS.LOADING,
            };

        case action.SET_LOADED_STATUS:
            return {
                ...state,
                status: STATUS.LOADED,
            };

        case action.SET_ERROR_STATUS:
            return {
                ...state,
                status: STATUS.ERROR,
                error: action.payload
            };

        default:
            return state;
    }
}
