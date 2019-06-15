import axios from 'axios';
import jwt from 'jsonwebtoken';

import { FETCH_RANDOM, REQUEST_ADD_OUTFIT, loadingDiceDone, errorMessage, receivedRandom } from './stylesReducer';

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
          console.log(response);
          store.dispatch(loadingDiceDone());
          store.dispatch(receivedRandom(response.data));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(errorMessage('Vous n\'avez pas renseigné de catégorie pour votre tenue. Merci de choisir une catégorie et relancez le dé.'));
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
          console.log(response);
        })
        .catch((error) => {
          console.log('erreur add outfit');
          console.log(store.getState().randomReducer);
        });
      break;
    default:
      // console.log('last action received: ', action);
      next(action);
  }
};

export default randomMiddleware;
