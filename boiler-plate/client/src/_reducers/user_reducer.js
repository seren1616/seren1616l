import {
  LOGIN_USER,
  REGIST_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_CART_ITEMS
} from "../_actions/types";

export default function(previousState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      //reducer에서 next state를 return 해야 함.
      //payload를 loginSuccess에 넣은거다?
      return { ...previousState, loginSuccess: action.payload };
      break;
    case REGIST_USER:
      return { ...previousState, success: action.payload };
      break;
    case AUTH_USER:
      return { ...previousState, userData: action.payload };
      break;
    case ADD_TO_CART:
      return {
        ...previousState,
        userData: {
          ...previousState.userData,
          cart: action.payload
        }
      };
      break;
    case GET_CART_ITEMS:
      return {
        ...previousState,
        userData: {
          ...previousState.userData,
          productItem: action.payload
        }
      };
      break;

    default:
      return previousState;
  }
}
