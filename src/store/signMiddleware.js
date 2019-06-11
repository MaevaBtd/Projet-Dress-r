import axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNUP_REQUEST } from './sign_reducer';

const signMiddleware = store => next => (action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST: {
      axios.post('https://jsonplaceholder.typicode.com/posts/', store.getState())
        .then((response) => {
          console.log('inscription');
        })
        .catch((error) => {
          console.log(error);
        });

      break;
    }
    case USER_SIGNUP_REQUEST: {
      axios.post('https://jsonplaceholder.typicode.com/posts/', store.getState())
        .then((response) => {
          console.log('connexion');
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
