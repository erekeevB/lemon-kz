const SET_ITEM = 'SET_ITEM';

let initialState = {

    item: {}

}

const itemReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_ITEM: {
            return {
                ...state,
                item: {...action.item}
            }
        }
        default:
            return state;

    }

}

export const setItem = (item) => ({type: SET_ITEM, item});


export const getSetRoomsThunk = (id) => (dispatch) => {
        
    

}

export default itemReducer;