export const initialState = {
  categories: [],
  styles: [],
  types: [],
  loadingAddCloth: false,
  errorAddCloth: '',
  redirectAddCloth: false,
  loadingRandom: false,
  errorRandom: '',
  modalShow: false,
  receivedCloths: [],
};

// == Action Type

export const FETCH_STYLES = 'FETCH_STYLES';
const RECEIVED_STYLES = 'RECEIVED_STYLES';
export const FETCH_TYPES = 'FETCH_TYPES';
const RECEIVED_TYPES = 'RECEIVED_TYPES';
const LOADING_ADD_CLOTH = 'LOADING_ADD_CLOTH';
const LOADING_ADD_CLOTH_DONE = 'LOADING_ADD_CLOTH_DONE';
const REDIRECT_ADD_CLOTH = 'REDIRECT_ADD_CLOTH';
const NOT_REDIRECT_ADD_CLOTH = 'NOT_REDIRECT_ADD_CLOTH';
const LOADING_DICE = 'LOADING_DICE';
const LOADING_DICE_DONE = 'LOADING_DICE_DONE';
export const FETCH_RANDOM = 'FETCH_RANDOM';
const ON_STYLE_CHANGE = 'ON_STYLE_CHANGE';
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const CLOSE_MODALE = 'CLOSE_MODALE';
const RECEIVED_RANDOM = 'RECEIVED_RANDOM';
const DELETE_ERROR_MESSAGE = 'DELETE_ERROR_MESSAGE';
export const REQUEST_ADD_OUTFIT = 'REQUEST_ADD_OUTFIT';
const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';
const CLEAN_STYLE_STATE = 'CLEAN_STYLE_STATE';

// Reducer
const stylesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Fetch styles
    case RECEIVED_STYLES:
      return {
        ...state,
        categories: action.styles,
      };
    case RECEIVED_TYPES:
      return {
        ...state,
        types: [...action.types],
      };
    case ON_STYLE_CHANGE:
      return {
        ...state,
        styles: [action.value],
      };
    case LOADING_ADD_CLOTH:
      return {
        ...state,
        loadingAddCloth: true,
      };
    case LOADING_ADD_CLOTH_DONE:
      return {
        ...state,
        loadingAddCloth: false,
        errorAddCloth: action.message,
      };
    case REDIRECT_ADD_CLOTH:
      return {
        ...state,
        redirectAddCloth: true,
      };
    case NOT_REDIRECT_ADD_CLOTH:
      return {
        ...state,
        redirectAddCloth: false,
      };
    case LOADING_DICE:
      return {
        ...state,
        loadingRandom: true,
      };
    case LOADING_DICE_DONE:
      return {
        ...state,
        loadingRandom: false,
        modalShow: true,
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorRandom: action.message,
      };
    case DELETE_ERROR_MESSAGE:
      return {
        ...state,
        errorRandom: '',
      };
    case CLOSE_MODALE:
      return {
        ...state,
        modalShow: false,
      };
    case RECEIVED_RANDOM:
      console.log('bordel de received random');
      return {
        ...state,
        receivedCloths: [...action.cloths],
      };
    case CLEAN_ERROR_MESSAGE:
      return {
        ...state,
        errorAddCloth: '',
        errorRandom: '',
      };
    case CLEAN_STYLE_STATE:
      return {
        ...state,
        loadingAddCloth: false,
        errorAddCloth: '',
        redirectAddCloth: false,
        loadingRandom: false,
        errorRandom: '',
        modalShow: false,
        receivedCloths: [],
      };
    default:
      // console.log('fail ( add cloth reducer)');
      return state;
  }
};

// == Action Creator

// Fetch Styles
export const fetchStyles = () => ({
  type: FETCH_STYLES,
});
export const receivedStyles = styles => ({
  type: RECEIVED_STYLES,
  styles,
});
export const fetchTypes = () => ({
  type: FETCH_TYPES,
});
export const receivedTypes = types => ({
  type: RECEIVED_TYPES,
  types,
});
export const onStyleChange = value => ({
  type: ON_STYLE_CHANGE,
  value,
});
// loading
export const loadingAddCloth = () => ({
  type: LOADING_ADD_CLOTH,
});
export const loadingAddClothDone = message => ({
  type: LOADING_ADD_CLOTH_DONE,
  message,
});
// redirect page
export const redirectAddCloth = () => ({
  type: REDIRECT_ADD_CLOTH,
});
export const notRedirectAddCloth = () => ({
  type: NOT_REDIRECT_ADD_CLOTH,
});
// random function
export const loadingDice = () => ({
  type: LOADING_DICE,
});
export const loadingDiceDone = () => ({
  type: LOADING_DICE_DONE,
});
export const fetchRandom = style => ({
  type: FETCH_RANDOM,
  style,
});
export const errorMessage = message => ({
  type: ERROR_MESSAGE,
  message,
});
export const closeModal = () => ({
  type: CLOSE_MODALE,
});
export const receivedRandom = cloths => ({
  type: RECEIVED_RANDOM,
  cloths,
});
export const deleteErrorMessage = () => ({
  type: DELETE_ERROR_MESSAGE,
});
export const requestAddOutfit = cloths => ({
  type: REQUEST_ADD_OUTFIT,
  cloths,
});
export const cleanErrorMessage = () => ({
  type: CLEAN_ERROR_MESSAGE,
});
export const cleanStyleState = () => ({
  type: CLEAN_STYLE_STATE,
});

export default stylesReducer;
