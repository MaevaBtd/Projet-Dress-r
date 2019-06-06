import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import ajaxMiddleware from './ajaxMiddleware';

const middlewares = applyMiddleware(ajaxMiddleware);

const store = createStore(reducer, middlewares);

export default store;
