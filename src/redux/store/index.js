import { createStore, applyMiddleware } from 'redux';
import combineReducers from '../reducers';
import thunk from 'redux-thunk';

const initialState = { };

const store = createStore(combineReducers, initialState, applyMiddleware(thunk));

export default store;
