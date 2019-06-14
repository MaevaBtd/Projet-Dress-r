export const initialState = {
  categories: [],
  loadingAddCloth: false,
  errorAddCloth: '',
  redirectAddCloth: false,
};

// == Action Type

export const FETCH_STYLES = 'FETCH_STYLES';
const RECEIVED_STYLES = 'RECEIVED_STYLES';
const LOADING_ADD_CLOTH = 'LOADING_ADD_CLOTH';
const LOADING_ADD_CLOTH_DONE = 'LOADING_ADD_CLOTH_DONE';
const REDIRECT_ADD_CLOTH = 'REDIRECT_ADD_CLOTH';
const NOT_REDIRECT_ADD_CLOTH = 'NOT_REDIRECT_ADD_CLOTH';

// Reducer
const stylesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Fetch styles
    case RECEIVED_STYLES:
      return {
        ...state,
        categories: action.styles,
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


export default stylesReducer;
