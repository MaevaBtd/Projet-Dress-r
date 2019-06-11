import { createStore, applyMiddleware } from 'redux';
// import clothReducer from './cloth_reducer';
import ajaxMiddleware from './ajaxMiddleware';
import signReducer from './sign_reducer';
import signMiddleware from './signMiddleware';
import setAuthorizationToken from './utils/setAuthorizationToken';

const middlewares = applyMiddleware(signMiddleware, ajaxMiddleware);
const reducer = signReducer;

const store = createStore(reducer, middlewares);

setAuthorizationToken(localStorage.jwtToken);

export default store;
