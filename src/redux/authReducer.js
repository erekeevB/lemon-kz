import { addReservationAPI, currentUserAPI, getReservationAPI, loginAPI, logoutAPI, registerAPI } from "../API/authAPI";

const SET_AUTH = 'SET_AUTH';
const SET_ERROR = 'SET_ERROR';
const ADD_RESERVATION = 'ADD_RESERVATION';
const SET_RESERVATIONS = 'SET_RESERVATIONs';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {

    profile: {
        id: '',
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
        hotelId: '',
        currentReservations: [],
        pastReservations: []
    },
    isAuth: 0,
    isFetching: false,
    error: ''

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
        case SET_RESERVATIONS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    currentReservations: [...action.reservation.current],
                    pastReservations: [...action.reservation.past]
                }
            }
        }
        case ADD_RESERVATION: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    currentReservations:
                        state.profile.currentReservations ?
                        [...state.profile.currentReservations, action.current] : [action.current]
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
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        // role: role
        role: data.role
    };
    dispatch(setAuth(tempProfile, 1));

}

export const setAuth = (profile, isAuth) => ({ type: SET_AUTH, profile, isAuth });

export const addReservation = (current) => ({type: ADD_RESERVATION, current})

export const setReservations = (current, past) => ({type: SET_RESERVATIONS, current, past})

export const setError = (error) => ({ type: SET_ERROR, error })

export const toggleFetch = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getSetAuthThunk = () => (dispatch) => {

    setTempProfile(dispatch, {
        id: 1,
        username: 'adsfa',
        email: 'afdad',
        phoneNumber: '3453453',
        role: 'DeskClerk'
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
        username: 'adsfa',
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

export const getSetReservationThunk = () => (dispatch) => {

    // getReservationAPI()
    //     .then((data)=>{

    //         if(data.status==0){
    //             setReservations(data.currentReservations, data.pastReservations)
    //         }else{
    //             setReservations([], [])
    //         }

    //     })
    //     .catch(()=>{
    //         setReservations([], [])
    //     })

}

export const addReservationThunk = (reservation) => (dispatch) => {

    dispatch(addReservation({...reservation, roomNumber: 20}))


    // addReservationAPI(reservation)
    //     .then((data)=>{

    //         if(data.status==0){
    //             dispatch(addReservation({
    //                 ...reservation,
    //                 roomNumber: data.reservation.room.roomNumber,
    //                 hotelName: data.hotelName
    //             }))
    //         }

    //     })
    //     .catch(()=>{

    //     })

}

export default authReducer;