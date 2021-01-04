import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';

const { createStore, combineReducers, applyMiddleware } = require("redux");

let reducers = combineReducers({

    auth: authReducer,
    category: categoryReducer,
    app: appReducer,
    item: itemReducer,
    cart: cartReducer
    
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;