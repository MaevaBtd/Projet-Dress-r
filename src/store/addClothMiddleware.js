import axios from 'axios';
import {
  ADD_CLOTH_REQUEST,
} from './addCloth_reducer';
import { FETCH_STYLES, FETCH_TYPES, receivedStyles, loadingAddClothDone, redirectAddCloth, receivedTypes } from './stylesReducer';

const addClothMiddleware = store => next => (action) => {
  const fetchAPI = url => (
    axios.get(url, {
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
    case FETCH_TYPES:
      fetchAPI('http://localhost:8001/api/types')
        .then((response) => {
          store.dispatch(receivedTypes(response.data));
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case ADD_CLOTH_REQUEST:
      console.log(image);
      const { image } = store.getState().imageReducer;
      const { name, type, styles, onePart } = store.getState().addClothReducer;

      const formdata = new FormData();

      formdata.append('image', image);
      formdata.append('type', type);
      formdata.append('name', name);
      formdata.append('styles', styles);
      formdata.append('onePart', onePart);
      axios({
        url: 'http://localhost:8001/api/cloth/new',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        data: formdata,
      })
        .then((response) => {
          console.log('envoi add cloth:', response);
          // console.log(response.data.flash);
          store.dispatch(loadingAddClothDone(response.data.flash));
          store.dispatch(redirectAddCloth());
        })
        .catch((error) => {
          console.log('envoi add cloth:', store.getState().addClothReducer);
          // console.log(error, 'erreur');
          store.dispatch(loadingAddClothDone('ERREUR: Votre vêtement n\'a pas été ajouté'));
          store.dispatch(redirectAddCloth());
        });

      break;
    default:
      // console.log('last action received: ', action);
      next(action);
  }
};

export default addClothMiddleware;
