// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Signin from 'src/components/Sign/Signin';
// Action creators
import { changeUsername, changePwd, userSigninRequest, changeConfirmPwd, changeEmail, loadingNewUser  } from 'src/store/sign_reducer';

// === data / state
const mapStateToProps = state => ({
  username: state.signReducer.username,
  password: state.signReducer.password,
  email: state.signReducer.email,
  confirmPwd: state.signReducer.confirmPwd,
  loadingNewUser: state.signReducer.loadingNewUser,
  newUserMessage: state.signReducer.newUserMessage,
});

// actions / dispatch
const mapDispatchToProps = dispatch => ({
  onInputChange: (value) => {
    // console.log('DispatchToProps : onInputChange');
    // dispatch({ type: 'CHANGE_INPUT', content: value });
    dispatch(changeUsername(value));
  },
  onPwdChange: (pwd) => {
    // console.log('DispatchToProps : onInputChange');
    // dispatch({ type: 'CHANGE_INPUT', content: value });
    dispatch(changePwd(pwd));
  },
  userSigninRequest: () => {
    dispatch(userSigninRequest());
  },
  onConfirmPwdChange: (confirmPwd) => {
    dispatch(changeConfirmPwd(confirmPwd));
  },
  onEmailChange: (email) => {
    dispatch(changeEmail(email));
  },
  loading: () => {
    dispatch(loadingNewUser());
  },
});

// == Container
const SigninContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);

// == Export
export default SigninContainer;
