const initialState = {

};

// Action Type

// const KEY_UP = 'KEY_UP';

// Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case RECEIVED_DATAS:
    //   return {
    //     ...state,
    //     words: [...action.datas],
    //     status: 'loaded',
    //   };
    // case KEY_UP:
    //   return {
    //     ...state,
    //     letters: [...state.letters, action.key],
    //   };
    // case CHANGE_STATUS:
    //   return {
    //     ...state,
    //     status: action.status,
    //   };
    default:
      return state;
  }
};

// Action creator

// export const handleKeyUp = touche => ({
//   type: KEY_UP,
//   key: touche,
// });

export default reducer;
