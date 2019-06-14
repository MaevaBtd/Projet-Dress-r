// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Random from 'src/components/Random';
import { fetchStyles } from 'src/store/stylesReducer';
import { onStyleChange } from 'src/store/addCloth_reducer';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.stylesReducer.categories,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  fetchStyles: () => {
    dispatch(fetchStyles());
  },
  onStyleChange: (value) => {
    dispatch(onStyleChange(value));
  },
});

// == Connect
const RandomContainer = connect(mapStateToProps, mapDispatchToProps)(Random);

// == Export
export default RandomContainer;
