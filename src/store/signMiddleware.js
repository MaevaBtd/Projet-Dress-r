import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNUP_REQUEST,
  setCurrentUser,
  loadingOver,
  loadingNewUserDone,
} from './sign_reducer';
import setAuthorizationToken from './utils/setAuthorizationToken';

const signMiddleware = store => next => (action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST: {
      axios.post('http://127.0.0.1:8001/api/register',
        store.getState().signReducer)
        .then((response) => {
          console.log('nouvel utilisateur');
          store.dispatch(loadingNewUserDone('nouvel utilisateur créé. Merci de vous connecter'));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(loadingNewUserDone('Erreur'));
        });

      break;
    }
    case USER_SIGNUP_REQUEST: {
      axios.post('http://localhost:8001/api/login_check', store.getState().signReducer)
        .then((response) => {
          const userToken = response.data.token;
          localStorage.setItem('jwtToken', userToken);
          setAuthorizationToken(userToken);
          store.dispatch(setCurrentUser(jwt.decode(userToken)));
          store.dispatch(loadingOver());
        })
        .catch((error) => {
          store.dispatch(loadingOver('Identifiants erronés'));
        });

      break;
    }
    default:
      next(action);
      break;
  }
};

export default signMiddleware;
