// == Import: Yarn
import { connect } from 'react-redux';


// == Import: local
import FormAddOutfit from 'src/components/Outfit/FormAddOutfit';
import { fetchStyles } from 'src/store/stylesReducer';
import { fetchUserCloth } from '../store/user_reducer';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.stylesReducer.categories,
  clothsList: state.userReducer.clothsList,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  fetchStyles: () => {
    dispatch(fetchStyles());
  },
  fetchUserCloth: () => {
    dispatch(fetchUserCloth());
  },
});

// == Connect
const FormAddOutfitContainer = connect(mapStateToProps, mapDispatchToProps)(FormAddOutfit);

// == Export
export default FormAddOutfitContainer;
