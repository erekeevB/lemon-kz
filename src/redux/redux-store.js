import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';

const { createStore, combineReducers, applyMiddleware } = require("redux");

let reducers = combineReducers({

    auth: authReducer,
    category: categoryReducer,
    app: appReducer
    
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;