// import npm
import { connect } from 'react-redux';

// import local
import ClothList from '../components/Cloth/ClothList';
// action creators
import { fetchUserCloth } from '../store/user_reducer';

// data
const mapStateToProps = state => ({
  clothsList: state.userReducer.clothsList,
});

// container
const mapDispatchToProps = dispatch => ({
  fetchUserCloth: () => {
    dispatch(fetchUserCloth());
  },
});

const ClothListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClothList);

// export
export default ClothListContainer;
