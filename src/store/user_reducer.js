export const initialState = {

};

// Action Type
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
const RECEIVED_USER_DATA = 'RECEIVED_USER_DATA';
export const FETCH_CLOTH_CONTENT = 'FETCH_CLOTH_CONTENT';

// Reducer
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVED_USER_DATA:
      return {
        ...state,
        user: action.user.login,
        repos: action.repos,
        loading: false,
        message: 'Vous etes connecté',
        loggedin: true,
      };
    default:
      return state;
  }
};

// Action creator
export const fetchUserInfo = () => ({
  type: FETCH_USER_INFO,
});
export const receivedDatas = () => ({

});

export default userReducer;
