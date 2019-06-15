// import npm
import { connect } from 'react-redux';

// import local
import OutfitList from '../components/Outfit/OutfitList';
// action creators
import { fetchUserOutfits } from '../store/user_reducer';

// data
const mapStateToProps = state => ({
  outfitsList: state.userReducer.outfitsList,
});

// container
const mapDispatchToProps = dispatch => ({
  fetchUserOutfits: () => {
    dispatch(fetchUserOutfits());
  },
});

const OutfitListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutfitList);

// export
export default OutfitListContainer;
