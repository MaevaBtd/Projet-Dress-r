import axios from 'axios';
import {
  FETCH_STYLES,
  ADD_CLOTH_REQUEST,
  receivedStyles,
} from './addCloth_reducer';

const addClothMiddleware = store => next => (action) => {
  const fetchAPI = url => (
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  );
  const postAPI = url => (
    axios.post(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  );

  switch (action.type) {
    case FETCH_STYLES:
      fetchAPI('http://localhost:8001/api/styles')
        .then((response) => {
          store.dispatch(receivedStyles(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case ADD_CLOTH_REQUEST:
      axios.post('http://localhost:8001/api/cloth/new', store.getState().addClothReducer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
        .then((response) => {
          console.log('votre vêtement à été ajouté', response);
        })
        .catch((error) => {
          console.log(error);
        });

      break;
    default:
      console.log('last action received: ', action);
      next(action);
  }
};

export default addClothMiddleware;
