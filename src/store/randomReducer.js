export const initialState = {
  name: '',
  cloths: [],
};

// Action type
const CHANGE_OUTFIT_NAME = 'CHANGE_OUTFIT_NAME';
const RECEIVED_CLOTH_ID = 'RECEIVED_CLOTH_ID';
const ADD_ALL_CLOTH = 'ADD_ALL_CLOTH';
const DELETE_STATE_CLOTH = 'DELETE_STATE_CLOTH';
const CLEAN_STATE = 'CLEAN_STATE';

// Reducer
const randomReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_OUTFIT_NAME:
      return {
        ...state,
        name: action.name,
      };
    case RECEIVED_CLOTH_ID:
      return {
        ...state,
        cloths: [...action.clothsId],
      };
    case ADD_ALL_CLOTH:
      console.log();
      return {
        ...state,
        cloths: action.clothsArray,
      };
    case DELETE_STATE_CLOTH:
      return {
        ...state,
        cloths: [],
      };
    case CLEAN_STATE:
      return {
        ...initialState,
      };
    default:
      // console.log('fail ( add cloth reducer)');
      return state;
  }
};

// == Action Creator
export const changeOutfitName = name => ({
  type: CHANGE_OUTFIT_NAME,
  name,
});
export const receivedClothId = clothsId => ({
  type: RECEIVED_CLOTH_ID,
  clothsId,
});
export const addAllCloth = clothsArray => ({
  type: ADD_ALL_CLOTH,
  clothsArray,
});
export const deleteStateCloth = () => ({
  type: DELETE_STATE_CLOTH,
});
export const cleanState = () => ({
  type: CLEAN_STATE,
});

export default randomReducer;
