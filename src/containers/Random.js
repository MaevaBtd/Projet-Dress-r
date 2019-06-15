// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Random from 'src/components/Random';
import { fetchStyles, loadingDice, fetchRandom, closeModal } from 'src/store/stylesReducer';
import { onStyleChange } from 'src/store/addCloth_reducer';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  styles: state.stylesReducer.styles,
  categories: state.stylesReducer.categories,
  loadingRandom: state.stylesReducer.loadingRandom,
  errorRandom: state.stylesReducer.errorRandom,
  modalShow: state.stylesReducer.modalShow,
  receivedCloths: state.stylesReducer.receivedCloths,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  fetchStyles: () => {
    dispatch(fetchStyles());
  },
  onStyleChange: (value) => {
    dispatch(onStyleChange(value));
  },
  loadingDice: () => {
    console.log('loadingdice');
    dispatch(loadingDice());
  },
  fetchRandom: (styleId) => {
    console.log('fetch:', styleId);
    dispatch(fetchRandom(styleId));
  },
  closeModal: () => {
    console.log('close modale');
    dispatch(closeModal());
  },
});

// == Connect
const RandomContainer = connect(mapStateToProps, mapDispatchToProps)(Random);

// == Export
export default RandomContainer;
