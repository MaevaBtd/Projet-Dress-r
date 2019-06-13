// import npm
import { connect } from 'react-redux';

// import local
import ClothList from '../components/Cloth/ClothList';
// action creators
import { fetchUserCloth, removeCloth } from '../store/user_reducer';

// data
const mapStateToProps = state => ({
  clothsList: state.userReducer.clothsList,
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
});


const ClothListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClothList);

// export
export default ClothListContainer;
