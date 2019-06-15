// == Import: Yarn
import { connect } from 'react-redux';


// == Import: local
import Accueil from 'src/components/Accueil';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// == DispatchToProps
const mapDispatchToProps = () => ({});

// == Connect
const AccueilContainer = connect(mapStateToProps, mapDispatchToProps)(Accueil);

// == Export
export default AccueilContainer;
