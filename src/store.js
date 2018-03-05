import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';

const middleware = [];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware), ...enhancers));

export default store;
