// == Import: Yarn
import { connect } from 'react-redux';


// == Import: local
import FormAddOutfit from 'src/components/Outfit/FormAddOutfit';
import { fetchStyles, requestAddOutfit } from 'src/store/stylesReducer';
import { fetchUserCloth } from '../store/user_reducer';
import {
  changeHead,
  changeShoes,
  changePants,
  changeTop,
  changeCoat,
  modalShow,
  closeModalOutfit,
  redirectOutfit,
  stopRedirect,
  loadingAddOutfit,
} from '../store/addOutfitReducer';
import { addAllCloth, changeOutfitName, deleteStateCloth } from '../store/randomReducer';

// == StateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.stylesReducer.categories,
  clothsList: state.userReducer.clothsList,
  showModal: state.addOutfitReducer.showModal,
  allCloths: state.addOutfitReducer.allCloths,
  head: state.addOutfitReducer.head,
  coat: state.addOutfitReducer.coat,
  top: state.addOutfitReducer.top,
  pants: state.addOutfitReducer.pants,
  shoes: state.addOutfitReducer.shoes,
  redirectAddOutfit: state.addOutfitReducer.redirectAddOutfit,
  loadingOutfit: state.addOutfitReducer.loadingOutfit,
});

// == DispatchToProps
const mapDispatchToProps = dispatch => ({
  fetchStyles: () => {
    dispatch(fetchStyles());
  },
  fetchUserCloth: () => {
    dispatch(fetchUserCloth());
  },
  changeHead: (head) => {
    console.log('change head containers', head);
    dispatch(changeHead(head));
  },
  changeCoat: (coat) => {
    console.log('change coat containers', coat);
    dispatch(changeCoat(coat));
  },
  changeTop: (top) => {
    console.log('change top containers', top);
    dispatch(changeTop(top));
  },
  changePants: (pants) => {
    console.log('change pants containers', pants);
    dispatch(changePants(pants));
  },
  changeShoes: (shoes) => {
    console.log('change shoes containers', shoes);
    dispatch(changeShoes(shoes));
  },
  addAllCloth: (clothsArray) => {
    console.log('dispatchtab', clothsArray);
    dispatch(addAllCloth(clothsArray));
  },
  modalShow: () => {
    dispatch(modalShow());
  },
  closeModalOutfit: () => {
    dispatch(closeModalOutfit());
  },
  onInputChange: (value) => {
    dispatch(changeOutfitName(value));
  },
  deleteStateCloth: () => {
    console.log('delete');
    dispatch(deleteStateCloth());
  },
  requestAddOutfit: () => {
    dispatch(requestAddOutfit());
  },
  redirectOutfit: () => {
    dispatch(redirectOutfit());
  },
  stopRedirect: () => {
    dispatch(stopRedirect());
  },
  loadingAddOutfit: () => {
    console.log('startloading');
    dispatch(loadingAddOutfit());
  },

});


// == Connect
const FormAddOutfitContainer = connect(mapStateToProps, mapDispatchToProps)(FormAddOutfit);

// == Export
export default FormAddOutfitContainer;
