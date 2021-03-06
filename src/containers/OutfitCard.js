// import npm
import { connect } from 'react-redux';

// import local
import OutfitCard from '../components/Outfit/OutfitCard';
// action creators
import { removeOutfit, showModalOutfit } from '../store/user_reducer';

// data
const mapStateToProps = state => ({
  showModalOutfit: state.userReducer.showModalOutfit,
});

// container
const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemoveOutfit: () => {
    // console.log('les props des tenues:', ownProps);
    dispatch(removeOutfit(ownProps.id));
  },
  onShowModal: () => {
    dispatch(showModalOutfit());
  },
});

const OutfitCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutfitCard);

// export
export default OutfitCardContainer;
