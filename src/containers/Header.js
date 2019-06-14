// Import npm
import { connect } from 'react-redux';

// Import local
import Header from '../components/Header ';
import setAuthorizationToken from '../store/utils/setAuthorizationToken';
import { setCurrentUser, isDeconnected } from '../store/sign_reducer';

// data / state
const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(isDeconnected());
  },
});


// == Container
const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

// Export
export default HeaderContainer;
