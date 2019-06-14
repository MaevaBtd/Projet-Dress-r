// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Signup from 'src/components/Sign/Signup';
// Action creators
import { changeUsername, changePwd, userSignupRequest } from 'src/store/sign_reducer';

// === data / state
const mapStateToProps = state => ({
  username: state.signReducer.username,
  password: state.signReducer.password,
  isAuthenticated: state.auth.isAuthenticated,
  isConnected: state.signReducer.isConnected,
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
  userSignupRequest: () => {
    dispatch(userSignupRequest());
  },
});

// == Container
const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

// == Export
export default SignupContainer;
