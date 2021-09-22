import axios from "axios";
import { LOGIN_USER } from "./types";
export function loginUser(dataToSubmit) {
  //서버에서 axios 로 보낸 요청에 대한 응답값을 request에 넣는다
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then(response => response.data);

  //다음에 reducer으로 return 해줘야한다.
  return {
    type: "LOGIN_USER",
    payload: request
  };
}
