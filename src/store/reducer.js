const initialState = {
  userCloth: [],
  userOutfits: [],
};

// Action Type
export const FETCH_CLOTH_CONTENT = 'FETCH_CLOTH_CONTENT';
export const RECEIVED_DATAS = 'RECEIVED_DATAS';

// Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVED_DATAS:
      return {
        ...state,
        userCloth: [...action.content],
      };

    default:
      return state;
  }
};

// Action creator

export const fetchClothContent = () => ({
  type: FETCH_CLOTH_CONTENT,
});

export const receivedDatas = content => ({
  type: RECEIVED_DATAS,
  content,
});

export default reducer;
