import { createStore, applyMiddleware, combineReducers } from 'redux';
// import clothReducer from './cloth_reducer';
import jwt from 'jsonwebtoken';
import ajaxMiddleware from './ajaxMiddleware';
import signReducer, { setCurrentUser } from './sign_reducer';
import userReducer from './user_reducer';
import addClothReducer from './addCloth_reducer';
import signMiddleware from './signMiddleware';
import setAuthorizationToken from './utils/setAuthorizationToken';
import auth from './auth';


/* eslint-disable no-underscore-dangle */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middlewares = applyMiddleware(signMiddleware, ajaxMiddleware);
const enhancers = (devTools, middlewares);
const reducer = combineReducers({ signReducer, auth, userReducer, addClothReducer });

const store = createStore(reducer, enhancers);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}


export default store;
