export const initialState = {
  name: '',
  cloths: [],
};

// Action type
const CHANGE_OUTFIT_NAME = 'CHANGE_OUTFIT_NAME';
const RECEIVED_CLOTH_ID = 'RECEIVED_CLOTH_ID';

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

export default randomReducer;
