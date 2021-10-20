import { INSERT_BOARD } from "../_actions/types";
export default function(previousState = {}, action) {
  switch (action.type) {
    case INSERT_BOARD:
      //reducer에서 next state를 return 해야 함.
      //payload를 loginSuccess에 넣은거다?
      return { ...previousState, status: action.payload };
      break;
    default:
      return previousState;
  }
}
