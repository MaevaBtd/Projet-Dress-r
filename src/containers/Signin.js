// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Signin from 'src/components/Sign/Signin';
// Action creators
import { changeUsername, changePwd, userSigninRequest } from 'src/store/sign_reducer';

// === data / state
const mapStateToProps = state => ({
  username: state.username,
  password: state.password,
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
});

// == Container
const SigninContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);

// == Export
export default SigninContainer;
