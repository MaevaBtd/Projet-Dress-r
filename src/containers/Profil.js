// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Profil from 'src/components/Profil';

// Action creators
import { fetchUserInfo } from 'src/store/user_reducer';

// == StateToProps
const mapStateToProps = () => ({
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
