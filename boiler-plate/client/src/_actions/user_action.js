import axios from "axios";
import { LOGIN_USER, REGIST_USER } from "./types";
export function loginUser(dataToSubmit) {
  //서버에서 axios 로 보낸 요청에 대한 응답값{response.data}을 request에 넣는다
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then(response => response.data);

  //다음에 reducer으로 return 해줘야한다.
  return {
    //직접 지정 : type: "LOGIN_USER",
    //types 폴더에서 타입을 가져오는 방법
    type: LOGIN_USER,
    //request가 결국 위의 axios를 부르고, 그것을 통해 가져온 back-end의 모든 데이터
    //모든 데이터를 담은 request가 payload에 담기고, reducer에서 해당 action의 payload를 이용한다
    payload: request
  };
}

export function registUser(dataToSubmit) {
  // const resultFromAxios = axios
  //   .post("/api/users/register", dataToSubmit)
  //   .then(response => response.data);

  const resultFromAxios = axios
    .post("/server/checkValidUser", dataToSubmit)
    .then(response => response.data);

  //다음에 reducer으로 return 해줘야한다.
  return {
    //직접 지정 : type: "LOGIN_USER",
    //types 폴더에서 타입을 가져오는 방법
    type: REGIST_USER,
    //request가 결국 위의 axios를 부르고, 그것을 통해 가져온 back-end의 모든 데이터
    //모든 데이터를 담은 request가 payload에 담기고, reducer에서 해당 action의 payload를 이용한다
    payload: resultFromAxios
  };
}
