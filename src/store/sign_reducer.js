export const initialState = {
  username: '',
  password: '',
  email: '',
  confirmPwd: '',
  isConnected: false,
};

// Action Type
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_PWD = 'CHANGE_PWD';
const CHANGE_CONFIRM_PWD = 'CHANGE_CONFIRM_PWD';
const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST ';
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST ';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
const IS_CONNECTED = 'IS_CONNECTED';
const IS_DECONNECTED = 'IS_DECONNECTED';


// Reducer
const signReducer = (state = initialState, action = {}) => {
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
    case CHANGE_CONFIRM_PWD:
      return {
        ...state,
        confirmPwd: action.content,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.content,
      };
    case IS_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case IS_DECONNECTED:
      return {
        ...state,
        isConnected: false,
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
export const changeConfirmPwd = confirmPwd => ({
  type: CHANGE_CONFIRM_PWD,
  content: confirmPwd,
});
export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  content: email,
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
export const isConnected = () => ({
  type: IS_CONNECTED,
});
export const isDeconnected = () => ({
  type: IS_DECONNECTED,
});

export default signReducer;
