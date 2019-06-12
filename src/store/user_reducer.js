export const initialState = {
  email: '',
  username: '',
  creation_date: '',
  clothsList: [],
};

// Action Type
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
const RECEIVED_USER_DATA = 'RECEIVED_USER_DATA';
export const FETCH_USER_CLOTH = 'FETCH_USER_CLOTH';
const RECEIVED_CLOTH = 'RECEIVED_CLOTH';

// Reducer
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVED_USER_DATA:
      return {
        ...state,
        username: action.user[0].username,
        email: action.user[0].email,
        creation_date: action.user[0].createdAt,
      };
    case RECEIVED_CLOTH:
      console.log('cloths :', action.cloths[0].cloths);
      return {
        ...state,
        clothsList: action.cloths[0].cloths,
      };

    default:
      return state;
  }
};

// Action creator
export const fetchUserInfo = () => ({
  type: FETCH_USER_INFO,
});
export const receivedDatas = user => ({
  type: RECEIVED_USER_DATA,
  user,
});
export const fetchUserCloth = () => ({
  type: FETCH_USER_CLOTH,
});
export const receivedCloths = cloths => ({
  type: RECEIVED_CLOTH,
  cloths,
});

export default userReducer;
