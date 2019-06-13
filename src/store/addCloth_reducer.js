export const initialState = {
  type: '',

};

// Action Type
const ADD_TYPE_HEAD = 'ADD_TYPE_HEAD';
const ADD_TYPE_TOP = 'ADD_TYPE_TOP';
const ADD_TYPE_VEST = 'ADD_TYPE_VEST';
const ADD_TYPE_BOT = 'ADD_TYPE_BOT';
const ADD_TYPE_SHOES = 'ADD_TYPE_SHOES';

// Reducer
const addClothReducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
    default:
      console.log('fail');
      return state;
  }
};

// Action Creator
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

export default addClothReducer;
