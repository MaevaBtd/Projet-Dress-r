export const initialState = {
  head: [],
  coat: [],
  top: [],
  pants: [],
  shoes: [],
  allCloths: [],
  showModal: false,
};

// == Action Type
const CHANGE_HEAD = 'CHANGE_HEAD';
const CHANGE_COAT = 'CHANGE_COAT';
const CHANGE_TOP = 'CHANGE_TOP';
const CHANGE_PANTS = 'CHANGE_PANTS';
const CHANGE_SHOES = 'CHANGE_SHOES';
const MODAL_SHOW = 'MODAL_SHOW';
const CLOSE_MODALE = 'CLOSE_MODALE';

// Reducer
const addOutfitReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_HEAD:
      console.log('status', action.head);
      return {
        ...state,
        head: [action.head],
      };
    case CHANGE_COAT:
      return {
        ...state,
        coat: [action.coat],
      };
    case CHANGE_TOP:
      return {
        ...state,
        top: [action.top],
      };
    case CHANGE_PANTS:
      return {
        ...state,
        pants: [action.pants],
      };
    case CHANGE_SHOES:
      return {
        ...state,
        shoes: [action.shoes],
      };
    case MODAL_SHOW:
      return {
        showModal: true,
      };
    case CLOSE_MODALE:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};

// == Action Creator
export const changeHead = head => ({
  type: CHANGE_HEAD,
  head,
});
export const changeCoat = coat => ({
  type: CHANGE_COAT,
  coat,
});
export const changeTop = top => ({
  type: CHANGE_TOP,
  top,
});
export const changePants = pants => ({
  type: CHANGE_PANTS,
  pants,
});
export const changeShoes = shoes => ({
  type: CHANGE_SHOES,
  shoes,
});
export const modalShow = () => ({
  type: MODAL_SHOW,
});
export const closeModal = () => ({
  type: CLOSE_MODALE,
});

export default addOutfitReducer;
