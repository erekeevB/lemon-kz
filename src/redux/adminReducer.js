import { deleteUserAPI, getUsersAPI } from "../API/adminAPI";

const SET_USERS = 'SET_USERS';
const DELETE_USER = 'DELETE_USER';
const ADD_USER = 'ADD_USER';

const SET_MANAGERS = 'SET_MANAGERS';
const DELETE_MANAGERS = 'DELETE_MANAGERS';
const ADD_MANAGERS = 'ADD_MANAGERS';

const SET_ERROR = 'SET_ERROR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {

    users: {
        names: ['id','firstName', 'secondName', 'email', 'password'],
        compactNames: ['id','firstName', 'email'],
        list: []
    },
    managers: {
        names: ['id','firstName', 'secondName', 'email', 'hotelId', 'password'],
        compactNames: ['id','firstName', 'hotelId'],
        list: []
    },
    error: '',
    isFetching: false,

}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USERS: {
            return {
                ...state,
                users: {
                    ...state.users, 
                    list: [...action.users]
                }
            }
        }
        case DELETE_USER: {
            return {
                ...state,
                users: {
                    ...state.users, 
                    list: [...state.users.list.filter((user) => user.id !== action.userId)]
                } 
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

const setUsers = (users) => ({ type: SET_USERS, users });

const deleteUser = (userId) => ({ type: DELETE_USER, userId });

const setError = (error) => ({ type: SET_ERROR, error })

const toggleFetch = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getSetUsersThunk = () => (dispatch) => {

    let data = [
        {id: 1, firstName: 'asdas', email: 'asdasda', secondName: 'asdasda'},
        {id: 2, firstName: 'asdas', email: 'asdasda', secondName: 'asdasda'},
        {id: 3, firstName: 'asdas', email: 'asdasda', secondName: 'asdasda'},
        {id: 4, firstName: 'asdas', email: 'asdasda', secondName: 'asdasda'}
    ]

    dispatch(setUsers(data));


    // dispatch(toggleFetch(true));
    // debugger
    // getUsersAPI()
    //     .then((data) => {

    //         dispatch(setUsers(data));
    //         dispatch(setError(''));

    //     })
    //     .catch(() => {

    //         dispatch(setUsers([]));
    //         dispatch(setError(''));

    //     })

}

export const deleteUserThunk = (userId) => (dispatch) => {

    dispatch(deleteUser(userId));


    // deleteUserAPI(userId)
    //     .then(data => {

    //         if (data.status === 0) {

    //             dispatch(deleteUser(userId));

    //             dispatch(setError(''));

    //         } else {

    //             dispatch(setError(data.message));

    //         }

    //     })
    //     .catch(() => {

    //         dispatch(setError('Something went wrong!'));

    //     })

}

export default adminReducer;