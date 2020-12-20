import { addReservationAPI, currentUserAPI, getReservationAPI, loginAPI, logoutAPI, registerAPI } from "../api/authAPI";

const SET_AUTH = 'SET_AUTH';
const EDIT_PROFILE = 'EDIT_PROFILE';
const SET_FAVOURITES = 'SET_FAVOURITES';
const ADD_FAVOURITE = 'ADD_FAVOURITE';
const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
const SET_ERROR = 'SET_ERROR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {

    profile: {
        id: null,
        name: null,
        surname: null,
        thirdname: null,
        email: null,
        phoneNumber: null,
        role: null,
        img: null,
        sex: null
    },
    favourites: {},
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
        case ADD_FAVOURITE: {
            return {
                ...state,
                favourites: [...state.favourites, action.favourite]
            }
        }
        case DELETE_FAVOURITE: {
            return {
                ...state,
                favourites: state.favourites.filter((el)=>el.id !== action.favourite.id)
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

const setNullProfile = (dispatch) => {

    dispatch(setAuth(
        {
            username: '',
            email: '',
            phoneNumber: '',
            role: ''
        }, 
        0
    ));

}

const setTempProfile = (dispatch, data) => {

    // let role

    // switch(data.roles[0].name){
    //     case 'ROLE_ADMIN':
    //         role = 'Admin'
    //     case 'ROLE_USER':
    //         role = 'User'
    //     case 'ROLE_MANAGER':
    //         role = 'Manager'
    //     case 'ROLE_EMPLOYEE':
    //         role = 'Employee'
    // }

    let tempProfile = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        sex: data.sex,
        // role: role
        role: data.role
    };
    dispatch(setAuth(tempProfile, 1));

}

export const setAuth = (profile, isAuth) => ({ type: SET_AUTH, profile, isAuth });

export const editProfile = (profile) => ({ type: EDIT_PROFILE, profile });

export const setFavourites = (favourites) => ({ type: SET_FAVOURITES, favourites });

export const addFavourite = (favourite) => ({ type: ADD_FAVOURITE, favourite });

export const deleteFavourite = (favourite) => ({ type: DELETE_FAVOURITE, favourite });

export const setError = (error) => ({ type: SET_ERROR, error })

export const toggleFetch = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getSetAuthThunk = () => (dispatch) => {

    setTempProfile(dispatch, {
        id: 1,
        name: 'adsfa',
        surname: 'asdasd',
        email: 'afdad',
        phoneNumber: '3453453',
        role: 'Admin'
    });

    
    // dispatch(toggleFetch(true));

    // return currentUserAPI()
    //     .then((data) => {

    //         dispatch(toggleFetch(false));

    //         if (data.status === 0) {

    //             setTempProfile(dispatch, data.user);

    //         } else {

    //             setNullProfile(dispatch);

    //         }

    //         dispatch(setError(''));

    //     })
    //     .catch((err) => {

    //         setNullProfile(dispatch);

    //         dispatch(setError(''));


    //     })

}

export const loginUserThunk = (profile) => (dispatch) => {

    setTempProfile(dispatch, {
        id: 1,
        name: 'adsfa',
        surname: 'asdads',
        email: 'afdad',
        phoneNumber: '3453453',
        role: 'Manager'
    });  

    // loginAPI(profile)
    //     .then(data => {

    //         if (data.status === 0) {

    //             setTempProfile(dispatch, data.user);

    //             dispatch(setError(''));

    //         } else {

    //             setNullProfile(dispatch);

    //             dispatch(setError('Invalid Username or Password!'));

    //         }

    //     })
    //     .catch((err) => {

    //         setNullProfile(dispatch);

    //         dispatch(setError('Something went wrong!'));


    //     })

}

export const registerUserThunk = (profile) => (dispatch) => {

    setTempProfile(dispatch, {
        ...profile, 
        id: 1, 
        phoneNumber: '3453453',
        role: 'Manager'
    })

    // registerAPI(profile)
    //     .then(data => {

    //         if (data.status === 0) {

    //             setTempProfile(dispatch, data.user);

    //             dispatch(setError(''));

    //         } else {

    //             setNullProfile(dispatch);

    //             dispatch(setError('This user already exists!'));

    //         }

    //     })
    //     .catch((err) => {

    //         setNullProfile(dispatch);

    //         dispatch(setError('Something went wrong!'));

    //     })

}

export const logoutThunk = () => (dispatch) => {

    setNullProfile(dispatch);

    // logoutAPI()
    //     .then(()=>{

    //         setNullProfile(dispatch);

    //         dispatch(setError(''));

    //     })
    //     .catch((err) => {

    //         setNullProfile(dispatch);

    //         dispatch(setError(''));

    //     })

}

export const editProfileThunk = (profile) => (dispatch) => {

    editProfile(profile); 

}

export default authReducer;