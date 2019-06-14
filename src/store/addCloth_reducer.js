export const initialState = {
  type: '',
  name: '',
  styles: [],
  categories: [],
  onePart: false,
};

// == Action Type
// Chance Type Status
const ADD_TYPE_HEAD = 'ADD_TYPE_HEAD';
const ADD_TYPE_TOP = 'ADD_TYPE_TOP';
const ADD_TYPE_VEST = 'ADD_TYPE_VEST';
const ADD_TYPE_BOT = 'ADD_TYPE_BOT';
const ADD_TYPE_SHOES = 'ADD_TYPE_SHOES';
// Change Name Status
const CHANGE_CLOTH_NAME = 'CHANGE_CLOTH_NAME';
// Change Category status
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
// Fetch styles
export const FETCH_STYLES = 'FETCH_STYLES';
const RECEIVED_STYLES = 'RECEIVED_STYLES';
const ON_STYLE_CHANGE = 'ON_STYLE_CHANGE';
// One Part cloth ?
const ON_CHANGE_PART = 'ON_CHANGE_PART';
// on submit
export const ADD_CLOTH_REQUEST = 'ADD_CLOTH_REQUEST';

// Reducer
const addClothReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Chance type status
    case ADD_TYPE_HEAD:
      console.log('type tête ajouté');
      return {
        ...state,
        type: 'tête',
      };
    case ADD_TYPE_TOP:
      console.log('type haut ajouté');
      return {
        ...state,
        type: 'haut',
      };
    case ADD_TYPE_VEST:
      console.log('type veste ajouté');
      return {
        ...state,
        type: 'veste',
      };
    case ADD_TYPE_BOT:
      console.log('type bas ajouté');
      return {
        ...state,
        type: 'bas',
      };
    case ADD_TYPE_SHOES:
      console.log('type tête ajouté');
      return {
        ...state,
        type: 'chaussures',
      };

    // Change Name status
    case CHANGE_CLOTH_NAME:
      return {
        ...state,
        name: action.value,
      };

    // Fetch styles
    case RECEIVED_STYLES:
      return {
        ...state,
        categories: action.styles,
      };
    case ON_STYLE_CHANGE:
      return {
        ...state,
        styles: [...state.styles, action.value],
      };

    // One Part cloth ?
    case ON_CHANGE_PART:
      return {
        ...state,
        onePart: action.value,
      };
    default:
      // console.log('fail ( add cloth reducer)');
      return state;
  }
};

// == Action Creator
// Chanhe Type status
export const addHead = () => ({
  type: ADD_TYPE_HEAD,
});
export const addTop = () => ({
  type: ADD_TYPE_TOP,
});
export const addVest = () => ({
  type: ADD_TYPE_VEST,
});
export const addBot = () => ({
  type: ADD_TYPE_BOT,
});
export const addShoes = () => ({
  type: ADD_TYPE_SHOES,
});

// Change Name Status
export const changeClothName = value => ({
  type: CHANGE_CLOTH_NAME,
  value,
});

// Change category status
export const changeCategory = value => ({
  type: CHANGE_CATEGORY,
  value,
});

// Fetch Styles
export const fetchStyles = () => ({
  type: FETCH_STYLES,
});
export const receivedStyles = styles => ({
  type: RECEIVED_STYLES,
  styles,
});
export const onStyleChange = value => ({
  type: ON_STYLE_CHANGE,
  value,
});

// One part cloth?
export const onChangePart = value => ({
  type: ON_CHANGE_PART,
  value,
});

// submit
export const addClothRequest = () => ({
  type: ADD_CLOTH_REQUEST,
});


export default addClothReducer;
