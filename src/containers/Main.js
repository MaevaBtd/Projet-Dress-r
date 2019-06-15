// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Main from 'src/components/Main';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// == DispatchToProps
const mapDispatchToProps = () => ({});

// == Connect
const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

// == Export
export default MainContainer;
