import { getSearchResultAPI } from "../api/searchAPI";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const SET_RESULT = 'SET_RESULT';

const SET_ERROR = 'SET_ERROR';

let initialState = {

    result: [],
    isFetching: false,
    error: ''

}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_RESULT: {

            return {
                ...state,
                result: action.result.map((el)=>({...el}))
            }

        }
        case TOGGLE_IS_FETCHING: {
            
            return {
                ...state,
                isFetching: action.isFetching
            }

        }
        default:
            return state;

    }

}

export const toggleFetch = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const setResult = (result) => ({ type: SET_RESULT, result }) 

export const setError = (error) => ({ type: SET_ERROR, error });

export const getSetCategoryResultThunk = (isAll, category) => (dispatch) => {

    dispatch(toggleFetch(true))

    return getSearchResultAPI(isAll, category).then(data=>{
        if(data){
            dispatch(setResult(data))
            dispatch(setError(''))
            dispatch(toggleFetch(false))
        }else{
            dispatch(setError('404'))
        }

    })

}

export default categoryReducer;