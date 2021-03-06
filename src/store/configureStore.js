import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';
import friendReducer from './reducers/friends';
import expenseReducer from './reducers/expenses';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    authReducer,
    uiReducer,
    friendReducer,
    expenseReducer,
});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    )
};

export default configureStore;
