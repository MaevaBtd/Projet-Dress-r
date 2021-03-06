// == Import: Yarn
import { connect } from 'react-redux';

// == Import: local
import AddCloth from 'src/components/AddCloth';

// action creators
import { addHead, addBot, addTop, addShoes, addVest } from '../store/addCloth_reducer';
import { notRedirectAddCloth, cleanErrorMessage } from '../store/stylesReducer';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorAddCloth: state.stylesReducer.errorAddCloth,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  addTypeHead: () => {
    // console.log('chapeau dispatch');
    dispatch(addHead());
  },
  addTypeTop: () => {
    // console.log('top dispatch');
    dispatch(addTop());
  },
  addTypeVest: () => {
    // console.log('vest dispatch');
    dispatch(addVest());
  },
  addTypeBot: () => {
    // console.log('bot dispatch');
    dispatch(addBot());
  },
  addTypeShoes: () => {
    // console.log('shoes dispatch');
    dispatch(addShoes());
  },
  stopRedirect: () => {
    dispatch(notRedirectAddCloth());
  },
  cleanErrorMessage: () => {
    dispatch(cleanErrorMessage());
  },
});

// == Connect
const AddClothContainer = connect(mapStateToProps, mapDispatchToProps)(AddCloth);

// == Export
export default AddClothContainer;
