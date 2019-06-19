// import npm
import { connect } from 'react-redux';

// import local
import Cloth from '../components/Cloth';
// action creators
import { removeCloth, showModalDelete } from '../store/user_reducer';

// data
const mapStateToProps = state => ({
  showModalDelete: state.userReducer.showModalDelete,
});

// container
const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemoveCloth: () => {
    // console.log('les props des vêtement:', ownProps.id);
    dispatch(removeCloth(ownProps.id));
  },
  onShowModal: () => {
    dispatch(showModalDelete());
  },
});

const ClothContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cloth);

// export
export default ClothContainer;
