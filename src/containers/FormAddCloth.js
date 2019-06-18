// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import FormAddCloth from 'src/components/AddCloth/FormAddCloth';
import { changeClothName, onStyleChange, onChangePart, addClothRequest, selectedPicture } from 'src/store/addCloth_reducer';
import { fetchStyles, loadingAddCloth } from 'src/store/stylesReducer';

// == StateToProps
const mapStateToProps = state => ({
  categories: state.stylesReducer.categories,
  isAuthenticated: state.auth.isAuthenticated,
  loadingAddCloth: state.stylesReducer.loadingAddCloth,
  redirectAddCloth: state.stylesReducer.redirectAddCloth,
  type: state.addClothReducer.type,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  onInputChange: (value) => {
    // console.log('DispatchToProps : onInputChange');
    // dispatch({ type: 'CHANGE_INPUT', content: value });
    dispatch(changeClothName(value));
  },
  fetchStyles: () => {
    dispatch(fetchStyles());
  },
  onStyleChange: (value) => {
    dispatch(onStyleChange(value));
  },
  onChangePart: (value) => {
    dispatch(onChangePart(value));
  },
  addClothRequest: () => {
    dispatch(addClothRequest());
  },
  loading: () => {
    dispatch(loadingAddCloth());
  },
  selectedPicture: (picture) => {
    console.log('container pic');
    dispatch(selectedPicture(picture));
  },
});

// == Connect
const FormAddClothContainer = connect(mapStateToProps, mapDispatchToProps)(FormAddCloth);

// == Export
export default FormAddClothContainer;
