const ADD_CART_ITEM = 'ADD_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const INCREASE_AMOUNT = 'ADD_AMOUNT';
const DECREASE_AMOUNT = 'DECREASE_AMOUNT';
const TOGGLE_FETCH = 'TOGGLE_FETCH';
const SET_ERROR = 'SET_ERROR';

let initialState = {

    cart: [],
    deletedItems: [],
    error: '',
    isFetching: false

}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CART_ITEM: {
            if(state.cart.findIndex(el=>el.id===action.item.id)===-1){
                return {
                    ...state,
                    cart: [...state.cart, {...action.item}],
                }
            }else{
                return {
                    ...state,
                    cart: state.cart.map(el=>({...el}))
                }
            }
        }
        case DELETE_CART_ITEM: {
            return {
                ...state,
                cart: state.cart.filter(el=>el.id!==action.id)
            }
        }
        case INCREASE_AMOUNT: {
            let tempCart = [...state.cart]
            let i = tempCart.findIndex(el=>el.id===action.id)
            if(~i){
                tempCart[i].amount++
            }
            return {
                ...state,
                cart: tempCart
            }
        }
        case DECREASE_AMOUNT: {
            let tempCart = [...state.cart]
            let i = tempCart.findIndex(el=>el.id===action.id)
            if(~i){
                tempCart[i].amount--
            }
            return {
                ...state,
                cart: tempCart
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

export const addCartItem = (item, amount) => ({type: ADD_CART_ITEM, item: {...item, amount: amount}});

export const deleteCartItem = (id) => ({type: DELETE_CART_ITEM, id});

export const increaseAmount = (id) => ({type: INCREASE_AMOUNT, id});

export const decreaseAmount = (id) => ({type: DECREASE_AMOUNT, id});

export const setError = (error) => ({ type: SET_ERROR, error });

export const toggleFetch = (bool) => ({ type: TOGGLE_FETCH, bool });

export const addCardItemThunk = (item, amount) => (dispatch) => {

    dispatch(addCartItem(item, amount))

}

export const deleteCardItemThunk = (id) => (dispatch) => {

    dispatch(deleteCartItem(id))

}

export const changeAmountThunk = (id, isIncrease) => (dispatch) => {

    if(isIncrease){
        dispatch(increaseAmount(id))
    }else{
        dispatch(decreaseAmount(id))
    }
    
}

export default cartReducer;