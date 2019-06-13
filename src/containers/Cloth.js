// import npm
import { connect } from 'react-redux';

// import local
import Cloth from '../components/Cloth';
// action creators
import { removeCloth } from '../store/user_reducer';

// data
const mapStateToProps = () => ({

});

// container
const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemoveCloth: () => {
    console.log('les props des vêtement:', ownProps.id);
    dispatch(removeCloth(ownProps.id));
  },
});

const ClothContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cloth);

// export
export default ClothContainer;
