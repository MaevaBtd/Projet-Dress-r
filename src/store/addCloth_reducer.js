export const initialState = {
  type: '',
  name: '',
  styles: [],
  onePart: false,
  image: null,
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
const ON_STYLE_CHANGE = 'ON_STYLE_CHANGE';
// One Part cloth ?
const ON_CHANGE_PART = 'ON_CHANGE_PART';
// on submit
export const ADD_CLOTH_REQUEST = 'ADD_CLOTH_REQUEST';
const SELECTED_PICTURE = 'SELECTED_PICTURE';


// Reducer
const addClothReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Change type status
    case ADD_TYPE_HEAD:
      // console.log('type tête ajouté');
      return {
        ...state,
        type: 'tête',
      };
    case ADD_TYPE_TOP:
      // console.log('type haut ajouté');
      return {
        ...state,
        type: 'haut',
      };
    case ADD_TYPE_VEST:
      // console.log('type veste ajouté');
      return {
        ...state,
        type: 'veste',
      };
    case ADD_TYPE_BOT:
      // console.log('type bas ajouté');
      return {
        ...state,
        type: 'bas',
      };
    case ADD_TYPE_SHOES:
      // console.log('type tête ajouté');
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
    case ON_STYLE_CHANGE:
      return {
        ...state,
        styles: [action.value],
      };

    // One Part cloth ?
    case ON_CHANGE_PART:
      return {
        ...state,
        onePart: action.value,
      };
    case SELECTED_PICTURE:
      console.log('addpic');
      return {
        image: action.picture,
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
export const selectedPicture = picture => ({
  type: SELECTED_PICTURE,
  picture,
});


export default addClothReducer;
