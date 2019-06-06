import axios from 'axios';
import { FETCH_CLOTH_CONTENT, receivedDatas } from './reducer';

const ajaxMiddleware = store => next => (action) => {

  switch (action.type) {
    case FETCH_CLOTH_CONTENT: {
      const url = 'http://http://127.0.0.1:8001/api/user/1/cloth';
      axios.get(url)
        .then((response) => {
          const { data } = response;
          console.log(data);
          store.dispatch(receivedDatas(data));
        })
        .catch(error => console.error);

      break;
    }
    default:
      next(action);
      break;
  }
};

export default ajaxMiddleware;
