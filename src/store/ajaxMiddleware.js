import axios from 'axios';
import {
  FETCH_CLOTH_CONTENT,
  FETCH_USER_INFO,
  receivedDatas,
} from './user_reducer';

const ajaxMiddleware = store => next => (action) => {
  const fetchAPI = url => (
    axios.get(url, {
      headers: {
        Bearer: `${store.getState().token}`,
      },
    })
  );

  switch (action.type) {
    case FETCH_CLOTH_CONTENT:
      fetchAPI('http://localhost:8001/api/user/cloths')
        .then((response) => {
          console.log('succes fetch repo');
          const clothList = response.data;
          store.dispatch(receivedDatas(clothList));
        })
        .catch(() => {
          console.log('Error fetch repo');
        });
      break;
    case FETCH_USER_INFO:
      fetchAPI('http://localhost:8001/api/user/profil')
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      console.log('last action received: ', action);
      //console.log(store.getState().auth.isAuthenticated);
      next(action);
  }
};

export default ajaxMiddleware;
