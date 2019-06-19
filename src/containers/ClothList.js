// import npm
import { connect } from 'react-redux';

// import local
import ClothList from '../components/Cloth/ClothList';
// action creators
import { fetchUserCloth, removeCloth } from '../store/user_reducer';
import { fetchStyles, fetchTypes } from '../store/stylesReducer';

// data
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  clothsList: state.userReducer.clothsList,
  categories: state.stylesReducer.categories,
  types: state.stylesReducer.types,
});

// container
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUserCloth: () => {
    dispatch(fetchUserCloth());
  },
  onRemoveCloth: () => {
    console.log('les props des vêtement:', ownProps);
    dispatch(removeCloth(ownProps.id));
  },
  fetchStyles: () => {
    dispatch(fetchStyles());
  },
  fetchTypes: () => {
    // console.log('types fetched');
    dispatch(fetchTypes());
  },
});


const ClothListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClothList);

// export
export default ClothListContainer;
