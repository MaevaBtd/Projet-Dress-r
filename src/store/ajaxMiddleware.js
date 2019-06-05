import axios from 'axios';
import { FETCH_DATAS, receivedDatas } from './reducer';

const ajaxMiddleware = store => next => (action) => {
  switch (action.type) {
    case FETCH_DATAS: {
      // JE suis concerné par cette action
      // Je dois lancer uen requête
      const { letters } = store.getState();
      axios.post('http://localhost:3000/words', {
        letters,
      })
        .then((response) => {
          store.dispatch(receivedDatas(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default ajaxMiddleware;
