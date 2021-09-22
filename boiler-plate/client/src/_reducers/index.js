import { combineReducers } from "redux";
import user from "./user_reducer";
const rootReducer = combineReducers({
  user
});

//다른 파일에서 rootReducer를 사용할 수 있게 export default 처리
export default rootReducer;
