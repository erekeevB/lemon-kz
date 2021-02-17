const SET_AUTH = 'SET_AUTH';
const SET_QTY = 'SET_QTY';

let initialState = {

    profile: {
        id: null,
        username: null,
        lastName: null,
        firstName: null,
        email: null,
        phoneNumber: null,
        isStaff: null,
        sex: null,
        cartQty: null
    },
    isAuth: 0

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
        case SET_QTY:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    cartQty: action.qty
                }
            }
        default:
            return state;

    }

}

export const setAuth = (profile, isAuth) => ({ type: SET_AUTH, profile, isAuth });

export default authReducer;