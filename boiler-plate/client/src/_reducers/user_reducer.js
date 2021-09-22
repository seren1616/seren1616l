import { LOGIN_USER } from "../_actions/types";

export default function(previousState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      //payload를 loginSuccess에 넣은거다?
      return { ...previousState, loginSuccess: action.payload };
      break;

    default:
      return previousState;
  }
}
