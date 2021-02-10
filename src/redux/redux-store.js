import authReducer from './authReducer';

const { createStore, combineReducers } = require("redux");

let reducers = combineReducers({

    auth: authReducer
    
})
let store = createStore(reducers);

export default store;