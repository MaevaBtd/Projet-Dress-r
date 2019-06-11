export const initialState = {
  username: '',
  password: '',
  token: '',
  userCloth: [],
  userOutfits: [],
};

// Action Type
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_PWD = 'CHANGE_PWD';
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST ';
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST ';
export const RECEIVED_USER_TOKEN = 'RECEIVED_USER_TOKEN';
export const FETCH_CLOTH_CONTENT = 'FETCH_CLOTH_CONTENT';
export const RECEIVED_DATAS = 'RECEIVED_DATAS';


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
    case RECEIVED_USER_TOKEN:
      return {
        ...state,
        token: action.token,
      };
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
export const receivedUserToken = userToken => ({
  type: RECEIVED_USER_TOKEN,
  token: userToken,
});
export const fetchClothContent = () => ({
  type: FETCH_CLOTH_CONTENT,
});

export const receivedDatas = content => ({
  type: RECEIVED_DATAS,
  content,
});

export default signupReducer;
