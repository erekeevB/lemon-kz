import { getFavouritesAPI } from "../api/authAPI";

const SET_AUTH = 'SET_AUTH';
const EDIT_PROFILE = 'EDIT_PROFILE';
const SET_FAVOURITES = 'SET_FAVOURITES';
const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
const SET_ERROR = 'SET_ERROR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

let initialState = {

    profile: {
        id: null,
        username: null,
        lastName: null,
        firstName: null,
        email: null,
        phoneNumber: null,
        isStaff: null,
        sex: null
    },
    favourites: [],
    isAuth: 0,
    isFetching: false,
    error: null

}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_AUTH: {
            return {
                ...state,
                profile: {...action.profile},
                isAuth: action.isAuth
            }
        }
        case EDIT_PROFILE: {
            return {
                ...state,
                profile: {...state.profile, ...action.profile}
            }
        }
        case SET_FAVOURITES: {
            return {
                ...state,
                favourites: [...action.favourites]
            }
        }
        case DELETE_FAVOURITE: {
            return {
                ...state,
                favourites: state.favourites.filter((el)=>el.id !== action.id)
            }
        }
        case TOGGLE_FAVOURITE: {
            if(state.favourites.some(el => el.id === action.favourite.id)){
                return {
                    ...state,
                    favourites: state.favourites.filter(el => el.id !== action.favourite.id)
                }
            }else{
                return {
                    ...state,
                    favourites: [...state.favourites, action.favourite]
                }
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error
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

export const setAuth = (profile, isAuth) => ({ type: SET_AUTH, profile, isAuth });

export const editProfile = (profile) => ({ type: EDIT_PROFILE, profile });

export const setFavourites = (favourites) => ({ type: SET_FAVOURITES, favourites });

export const deleteFavourite = (id) => ({ type: DELETE_FAVOURITE, id });

export const setError = (error) => ({ type: SET_ERROR, error })

export const toggleFetch = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const toggleFavourite = (favourite) => ({ type: TOGGLE_FAVOURITE, favourite });

export const getSetAuthThunk = () => (dispatch) => {

    getFavouritesAPI().then((data)=>{
        if(data){
            dispatch(setFavourites(data))
        }
        dispatch(toggleFetch(false))
    })

}

export const loginUserThunk = (profile) => (dispatch) => {

    getFavouritesAPI().then((data)=>{
        debugger
        if(data){
            dispatch(setFavourites(data))
        }
        dispatch(toggleFetch(false))
    })

}

export const registerUserThunk = (profile) => (dispatch) => {

}

export const logoutThunk = () => (dispatch) => {

}

export const editProfileThunk = (profile) => (dispatch) => {

}

export const toggleFavouriteThunk = (favourite) => (dispatch) => {

}

export const deleteFavouriteThunk = (favourite) => (dispatch) => {

}

export default authReducer;