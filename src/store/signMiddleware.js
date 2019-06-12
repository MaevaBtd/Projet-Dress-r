import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNUP_REQUEST,
  setCurrentUser,
} from './sign_reducer';
import setAuthorizationToken from './utils/setAuthorizationToken';

const signMiddleware = store => next => (action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST: {
      axios.post('http://127.0.0.1:8001/api/login_check',
        store.getState())
        .then((response) => {
          console.log('inscription');
        })
        .catch((error) => {
          console.log(error);
        });

      break;
    }
    case USER_SIGNUP_REQUEST: {
      axios.post('http://localhost:8001/api/login_check', store.getState().signReducer)
        .then((response) => {
          const userToken = response.data.token;
          // store.dispatch(receivedUserToken(userToken));
          localStorage.setItem('jwtToken', userToken);
          setAuthorizationToken(userToken);
          store.dispatch(setCurrentUser(jwt.decode(userToken)));
          console.log(store.getState().auth.isAuthenticated);
        })
        .catch((error) => {
          console.log(error);
        });

      break;
    }
    default:
      next(action);
      break;
  }
};

export default signMiddleware;
