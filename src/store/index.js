import { createStore, applyMiddleware } from 'redux';
import clothReducer from './cloth_reducer';
import ajaxMiddleware from './ajaxMiddleware';
import signReducer from './sign_reducer';
import signMiddleware from './signMiddleware';

const middlewares = applyMiddleware(ajaxMiddleware, signMiddleware);
const reducer = (clothReducer, signReducer);

const store = createStore(reducer, middlewares);

export default store;
