import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import adminReducer from './adminReducer';
import appReducer from './appReducer';
import searchReducer from './searchReducer';

const { createStore, combineReducers, applyMiddleware } = require("redux");

let reducers = combineReducers({

    auth: authReducer,
    admin: adminReducer,
    search: searchReducer,
    app: appReducer
    
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;