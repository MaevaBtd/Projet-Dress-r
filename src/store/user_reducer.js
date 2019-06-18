export const initialState = {
  email: '',
  username: '',
  creation_date: '',
  nbCloths: '',
  nbOutfits: '',
  nbRandom: '',
  clothsList: [],
  outfitsList: [],
};

// Action Type
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
const RECEIVED_USER_DATA = 'RECEIVED_USER_DATA';
export const FETCH_USER_CLOTH = 'FETCH_USER_CLOTH';
const RECEIVED_CLOTH = 'RECEIVED_CLOTH';
export const FETCH_USER_OUTFIT = 'FETCH_USER_OUTFIT';
const RECEIVED_OUTFITS = 'RECEIVED_OUTFITS';
export const REMOVE_CLOTH = 'REMOVE_CLOTH';
export const REMOVE_OUTFIT = 'REMOVE_OUTFIT';
const DELETE_OUTFIT_FRONT = 'DELETE_OUTFIT_FRONT';
const DELETE_CLOTH_FRONT = 'DELETE_CLOTH_FRONT';

// Reducer
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVED_USER_DATA:
    // console.log(action.user.infos[0].createdAt);
      return {
        ...state,
        nbRandom: action.user.infos[0].nbRandom,
        nbOutfits: action.user.nbOutfits,
        username: action.user.infos[0].username,
        email: action.user.infos[0].email,
        creation_date: action.user.infos[0].createdAt,
        nbCloths: action.user.nbCloths,
      };
    case RECEIVED_CLOTH:
      console.log('cloths :', action.cloths[0].cloths);
      return {
        ...state,
        clothsList: action.cloths[0].cloths,
      };
    case RECEIVED_OUTFITS:
      console.log(action.outfits);
      return {
        ...state,
        outfitsList: action.outfits,
      };
    case DELETE_OUTFIT_FRONT:
      console.log(action.id);
      return {
        ...state,
        outfitsList: state.outfitsList.filter(outfit => outfit.id !== action.id),
      };
    case DELETE_CLOTH_FRONT:
      console.log(`le vêtement à l'id ${action.id} a bien été supprimé en front`);
      return {
        ...state,
        clothsList: state.clothsList.filter(cloth => cloth.id !== action.id),
      };
    default:
      return state;
  }
};

// Action creator
export const fetchUserInfo = () => ({
  type: FETCH_USER_INFO,
});
export const receivedDatas = user => ({
  type: RECEIVED_USER_DATA,
  user,
});
export const fetchUserCloth = () => ({
  type: FETCH_USER_CLOTH,
});
export const receivedCloths = cloths => ({
  type: RECEIVED_CLOTH,
  cloths,
});
export const fetchUserOutfits = () => ({
  type: FETCH_USER_OUTFIT,
});
export const receivedOutfits = outfits => ({
  type: RECEIVED_OUTFITS,
  outfits,
});
export const removeCloth = id => ({
  type: REMOVE_CLOTH,
  id,
});
export const removeOutfit = id => ({
  type: REMOVE_OUTFIT,
  id,
});
export const deleteOutfitFront = id => ({
  type: DELETE_OUTFIT_FRONT,
  id,
});
export const deleteClothFront = id => ({
  type: DELETE_CLOTH_FRONT,
  id,
});

export default userReducer;
