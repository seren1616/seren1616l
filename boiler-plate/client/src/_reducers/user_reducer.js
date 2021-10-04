import { LOGIN_USER, REGIST_USER } from "../_actions/types";

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

    default:
      return previousState;
  }
}
