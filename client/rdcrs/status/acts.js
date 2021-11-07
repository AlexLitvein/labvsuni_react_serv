export const SET_EMPTY_STATUS = 'SET_EMPTY_STATUS';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_LOADED_STATUS = 'SET_LOADED_STATUS';
export const SET_ERROR_STATUS = 'SET_ERROR_STATUS';

export const setEmpty = () => {
    console.log('act setEmpty');
    return {
        type: SET_EMPTY_STATUS,
    }
};

export const setLoading = () => {
    console.log('act setLoading');
    return {
        type: SET_LOADING_STATUS,
    }
};

export const setLoaded = () => {
    console.log('act setLoaded');
    return {
        type: SET_LOADED_STATUS,
    }
};

export const setError = (err) => {
    console.log('act setError');
    return {
        type: SET_ERROR_STATUS,
        payload: err
    }
};