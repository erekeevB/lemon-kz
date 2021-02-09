import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';

const { createStore, combineReducers, applyMiddleware } = require("redux");

let reducers = combineReducers({

    auth: authReducer
    
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;