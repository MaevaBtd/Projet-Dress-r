// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import Random from 'src/components/Random';
import { fetchStyles, loadingDice, fetchRandom, closeModal, deleteErrorMessage, requestAddOutfit } from 'src/store/stylesReducer';
import { onStyleChange } from 'src/store/addCloth_reducer';
import { changeOutfitName, receivedClothId } from 'src/store/randomReducer';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  styles: state.stylesReducer.styles,
  categories: state.stylesReducer.categories,
  loadingRandom: state.stylesReducer.loadingRandom,
  errorRandom: state.stylesReducer.errorRandom,
  modalShow: state.stylesReducer.modalShow,
  receivedCloths: state.stylesReducer.receivedCloths,
  outfitName: state.randomReducer.name,
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
  deleteErrorMessage: () => {
    dispatch(deleteErrorMessage());
  },
  requestAddOutfit: () => {
    dispatch(requestAddOutfit());
  },
  onInputChange: (value) => {
    dispatch(changeOutfitName(value));
  },
  receivedClothId: (clothId) => {
    dispatch(receivedClothId(clothId));
  },
});

// == Connect
const RandomContainer = connect(mapStateToProps, mapDispatchToProps)(Random);

// == Export
export default RandomContainer;
