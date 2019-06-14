import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
 
} from './randomReducer';

const randomMiddleware = store => next => (action) => {
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
    // case REMOVE_OUTFIT:
    //   fetchDeleteAPI(`http://localhost:8001/api/outfit/${action.id}/delete`)
    //     .then((response) => {
    //       console.log(`la tenue à l'id ${action.id} a bien été supprimé en bdd`);
    //       store.dispatch(deleteOutfitFront(action.id));
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   break;
    default:
      // console.log('last action received: ', action);
      next(action);
  }
};

export default randomMiddleware;
