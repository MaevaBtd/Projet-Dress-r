import axios from 'axios';
// import jwt from 'jsonwebtoken';

import {
  FETCH_RANDOM,
  REQUEST_ADD_OUTFIT,
  loadingDiceDone,
  errorMessage,
  receivedRandom,
} from './stylesReducer';
import {
  redirectOutfit,
  closeModalOutfit,
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
          // console.log(response);
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
      console.log('request tenue $$$$$$$$$$$$');
      axios.post('http://localhost:8001/api/outfit/new', store.getState().randomReducer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
        .then((response) => {
          store.dispatch(errorMessage(response.data.flash));
          redirectOutfit();
          closeModalOutfit();
          console.log('tenue ajouté $$$$$$$$$$$$');
        })
        .catch((error) => {
          store.dispatch(errorMessage('La tenue n\'a pas pu être créée. Avez vous bien renseigné un nom de tenue ?'));
          // console.log(error);
        });
      break;
    default:
      // console.log('last action received: ', action);
      next(action);
  }
};

export default randomMiddleware;
