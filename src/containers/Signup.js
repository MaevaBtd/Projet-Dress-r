// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Signup from 'src/components/Sign/Signup';
// Action creators
import { changeUsername, changePwd, userSignupRequest, loadingStatus } from 'src/store/sign_reducer';

// === data / state
const mapStateToProps = state => ({
  username: state.signReducer.username,
  password: state.signReducer.password,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.signReducer.loading,
  errorMessage: state.signReducer.errorMessage,
});

// actions / dispatch
const mapDispatchToProps = dispatch => ({
  onInputChange: (value) => {
    dispatch(changeUsername(value));
  },
  onPwdChange: (pwd) => {
    dispatch(changePwd(pwd));
  },
  userSignupRequest: () => {
    dispatch(userSignupRequest());
  },
  loadingChange: () => {
    dispatch(loadingStatus());
  },
});

// == Container
const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

// == Export
export default SignupContainer;
