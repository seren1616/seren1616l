import axios from "axios";
import { USER_SERVER } from "../Config";
import {
  LOGIN_USER,
  REGIST_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_CART_ITEMS
} from "./types";
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
  const resultFromAxios = axios
    .post("/api/users/register", dataToSubmit)
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

export function auth() {
  const request = axios.get("/api/users/auth").then(response => response.data);

  //다음에 reducer으로 return 해줘야한다.
  return {
    //직접 지정 : type: "LOGIN_USER",
    //types 폴더에서 타입을 가져오는 방법
    type: AUTH_USER,
    //request가 결국 위의 axios를 부르고, 그것을 통해 가져온 back-end의 모든 데이터
    //모든 데이터를 담은 request가 payload에 담기고, reducer에서 해당 action의 payload를 이용한다
    payload: request
  };
}

export function addToCart(id) {
  let body = {
    productId: id
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then(response => response.data);
  //결국 payload는 request의 응답값(response.data)가 된다
  return { type: ADD_TO_CART, payload: request };
}

export function getCartItem(cartItems, userCart) {
  // let body = { productId: id };
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(
      //카트아이템에 있는 내용물들의 정보를
      //product collection에서 가져온 뒤
      //카트아이템의 갯수랑 같이 묶어준다
      res => {
        userCart.forEach(cartItems => {
          res.data.forEach((productDetail, index) => {
            if (cartItems.id === productDetail._id) {
              res.data[index].quantity = cartItems.quantity;
            }
          });
        });
        return res.data;
      }
    );
  return { type: GET_CART_ITEMS, payload: request };
}
