import { getItemAPI } from "../api/searchAPI";

const SET_ITEM = 'SET_ITEM';
const TOGGLE_FETCH = 'TOGGLE_FETCH';
const SET_ERROR = 'SET_ERROR';

let initialState = {

    item: {},
    error: '',
    isFetching: true

}

const itemReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_ITEM: {
            return {
                ...state,
                item: {...action.item}
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case TOGGLE_FETCH: {
            return {
                ...state,
                isFetching: action.bool
            }
        }
        default:
            return state;

    }

}

export const setItem = (item) => ({type: SET_ITEM, item});

export const setError = (error) => ({ type: SET_ERROR, error });

export const toggleFetch = (bool) => ({ type: TOGGLE_FETCH, bool });

export const getSetItemThunk = (id) => (dispatch) => {
    
    dispatch(toggleFetch(true))

    getItemAPI(id).then((data)=>{
        if(data){
            dispatch(setItem(data))
        }
        dispatch(toggleFetch(false))
    })

}

export default itemReducer;