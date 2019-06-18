import axios from 'axios';
import {
  FETCH_USER_CLOTH,
  FETCH_USER_INFO,
  FETCH_USER_OUTFIT,
  REMOVE_CLOTH,
  REMOVE_OUTFIT,
  receivedDatas,
  receivedCloths,
  receivedOutfits,
  deleteOutfitFront,
  deleteClothFront,
} from './user_reducer';

const ajaxMiddleware = store => next => (action) => {
  const fetchAPI = url => (
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  );
  const fetchDeleteAPI = url => (
    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  );

  switch (action.type) {
    case FETCH_USER_CLOTH:
      fetchAPI('http://localhost:8001/api/user/cloths')
        .then((response) => {
          console.log(response);
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
          console.log(response.data);
          const userData = response.data;
          userData.infos = JSON.parse(userData.infos);
          // let newDate = userData.infos[0].createdAt;
          // console.log(userData.infos[0].createdAt);
          // newDate = dateFormat();
          // console.log(userData.infos[0].createdAt);
          store.dispatch(receivedDatas(userData));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case FETCH_USER_OUTFIT:
      fetchAPI('http://localhost:8001/api/user/outfits')
        .then((response) => {
          // console.log('outfits:', response.data[0].outfits);
          const outfitsList = response.data[0].outfits;
          store.dispatch(receivedOutfits(outfitsList));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case REMOVE_CLOTH:
      fetchDeleteAPI(`http://localhost:8001/api/cloth/${action.id}/delete`)
        .then((response) => {
          // console.log(`le vêtement à l'id ${action.id} a bien été supprimé en bdd`);
          store.dispatch(deleteClothFront(action.id));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case REMOVE_OUTFIT:
      fetchDeleteAPI(`http://localhost:8001/api/outfit/${action.id}/delete`)
        .then((response) => {
          // console.log(`la tenue à l'id ${action.id} a bien été supprimé en bdd`);
          store.dispatch(deleteOutfitFront(action.id));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      // console.log('last action received: ', action);
      next(action);
  }
};

export default ajaxMiddleware;
