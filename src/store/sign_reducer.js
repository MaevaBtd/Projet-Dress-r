export const initialState = {
  username: '',
  password: '',
};

// Action Type
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_PWD = 'CHANGE_PWD';
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST ';
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST ';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


// Reducer
const signupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.content,
      };
    case CHANGE_PWD:
      return {
        ...state,
        password: action.content,
      };

    default:
      return state;
  }
};

// Action creator
export const changeUsername = value => ({
  type: CHANGE_USERNAME,
  content: value,
});
export const changePwd = pwd => ({
  type: CHANGE_PWD,
  content: pwd,
});
export const userSignupRequest = () => ({
  type: USER_SIGNUP_REQUEST,
});
export const userSigninRequest = () => ({
  type: USER_SIGNIN_REQUEST,
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export default signupReducer;
