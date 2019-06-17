export const initialState = {
  image: null,
};

// == Action Type
// Chance Type Status
const SELECTED_PICTURE = 'SELECTED_PICTURE';

// Reducer
const imageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
export const selectedPicture = picture => ({
  type: SELECTED_PICTURE,
  picture,
});


export default imageReducer;
