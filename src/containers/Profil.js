// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Profil from 'src/components/Profil';

// Action creators
import { fetchUserInfo } from 'src/store/user_reducer';

// == StateToProps
const mapStateToProps = state => ({
  email: state.userReducer.email,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.userReducer.username,
  creationDate: state.userReducer.creation_date,
  nbCloths: state.userReducer.nbCloths,
  nbOutfits: state.userReducer.nbOutfits,
  nbRandom: state.userReducer.nbRandom,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  fetchUserInfo: () => {
    dispatch(fetchUserInfo());
  },
});

// == Connect
const ProfilContainer = connect(mapStateToProps, mapDispatchToProps)(Profil);

// == Export
export default ProfilContainer;
