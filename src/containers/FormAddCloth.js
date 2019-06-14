// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import FormAddCloth from 'src/components/AddCloth/FormAddCloth';
import { changeClothName, fetchStyles, onStyleChange, onChangePart, addClothRequest } from 'src/store/addCloth_reducer';

// == StateToProps
const mapStateToProps = state => ({
  categories: state.addClothReducer.categories,
  isAuthenticated: state.auth.isAuthenticated,
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
});

// == Connect
const FormAddClothContainer = connect(mapStateToProps, mapDispatchToProps)(FormAddCloth);

// == Export
export default FormAddClothContainer;
