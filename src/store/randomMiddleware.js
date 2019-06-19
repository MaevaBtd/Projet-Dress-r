import axios from 'axios';
// import jwt from 'jsonwebtoken';
import {
  Modal,
} from 'antd';

import {
  FETCH_RANDOM,
  REQUEST_ADD_OUTFIT,
  loadingDiceDone,
  errorMessage,
  receivedRandom,
} from './stylesReducer';

import {
  SHOW_VALIDATION,
  validationMessage,
  showValidation,
  redirectOutfit,
} from './addOutfitReducer';

const randomMiddleware = store => next => (action) => {
  const fetchAPI = url => (
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  );

  switch (action.type) {
    case FETCH_RANDOM:
      fetchAPI(`http://localhost:8001/api/cloth/random/style/${action.style}/`)
        .then((response) => {
          // console.log('response middleware', response.data);
          store.dispatch(loadingDiceDone());
          store.dispatch(receivedRandom(response.data));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(errorMessage(error.data.flash));
          store.dispatch(loadingDiceDone());
        });
      break;
    case REQUEST_ADD_OUTFIT:
      axios.post('http://localhost:8001/api/outfit/new', store.getState().randomReducer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
        .then((response) => {
          store.dispatch(errorMessage(response.data.flash));
          // console.log(response.data.flash);
          store.dispatch(validationMessage(response.data.flash));
          store.dispatch(showValidation(response.data.flash));
        })
        .catch((error) => {
          store.dispatch(errorMessage('La tenue n\'a pas pu être créée', error));
          // console.log(error);
          store.dispatch(validationMessage(error.data.flash));
          store.dispatch(showValidation(error.data.flash));
        });
      break;
    case SHOW_VALIDATION:
      Modal.info({
        title: action.message,
        onOk() {
          store.dispatch(redirectOutfit());
        },
      });
      break;
    default:
      // console.log('last action received: ', action);
      next(action);
  }
};

export default randomMiddleware;
