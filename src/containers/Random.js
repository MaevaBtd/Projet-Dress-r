// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Random from 'src/components/Random';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// == DispatchToProps
const mapDispatchToProps = () => ({});

// == Connect
const RandomContainer = connect(mapStateToProps, mapDispatchToProps)(Random);

// == Export
export default RandomContainer;
