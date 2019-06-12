import axios from 'axios';
import {
  FETCH_USER_CLOTH,
  FETCH_USER_INFO,
  FETCH_USER_OUTFIT,
  receivedDatas,
  receivedCloths,
  receivedOutfits,
} from './user_reducer';

const ajaxMiddleware = store => next => (action) => {
  const fetchAPI = url => (
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  );

  switch (action.type) {
    case FETCH_USER_CLOTH:
      fetchAPI('http://localhost:8001/api/user/cloths')
        .then((response) => {
          // console.log(response);
          const clothList = response.data;
          store.dispatch(receivedCloths(clothList));
        })
        .catch((error) => {
          console.log('Error fetch cloths', error);
        });
      break;
    case FETCH_USER_INFO:
      fetchAPI('http://localhost:8001/api/user/profile')
        .then((response) => {
          // console.log(response.data);
          const userData = response.data;
          store.dispatch(receivedDatas(userData));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case FETCH_USER_OUTFIT:
      fetchAPI('http://localhost:8001/api/user/outfits')
        .then((response) => {
          console.log('outfits:', response.data[0].outfits);
          const outfitsList = response.data[0].outfits;
          store.dispatch(receivedOutfits(outfitsList));
        });
      break;
    default:
      console.log('last action received: ', action);
      // console.log(store.getState().auth.isAuthenticated);
      next(action);
  }
};

export default ajaxMiddleware;
