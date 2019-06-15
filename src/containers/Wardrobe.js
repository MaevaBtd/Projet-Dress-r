// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Wardrobe from 'src/components/Wardrobe';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// == DispatchToProps
const mapDispatchToProps = () => ({});

// == Connect
const WardrobeContainer = connect(mapStateToProps, mapDispatchToProps)(Wardrobe);

// == Export
export default WardrobeContainer;
