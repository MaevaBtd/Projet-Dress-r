import axios from 'axios';
import {
  FETCH_CLOTH_CONTENT,
  receivedDatas,
} from './sign_reducer';

const ajaxMiddleware = store => next => (action) => {
  const fetchGithub = url => (
    axios.get(url, {
      headers: {
        Bearer: `${store.getState().token}`,
      },
    })
  );

  switch (action.type) {
    case FETCH_CLOTH_CONTENT:
      fetchGithub('http://localhost:8001/api/user/cloths')
        .then((response) => {
          console.log('succes fetch repo');
          const clothList = response.data;
          store.dispatch(receivedDatas(clothList));
        })
        .catch(() => {
          console.log('Error fetch repo');
        });
      break;
    default:
      console.log('last action received: ', action);
      console.log(store.getState().auth.isAuthenticated);
      next(action);
  }
};

export default ajaxMiddleware;
