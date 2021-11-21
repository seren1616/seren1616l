import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItem } from "../../../_actions/user_action";
function CartPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    //리덕스 유저 스테이트 안에 카트 안에 상품이 있는지를 먼저 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        let cartItems = [];
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
          dispatch(getCartItem(cartItems, props.user.userData.cart));
        });
      }
    }
  }, []);
  return <div>here is user cart page</div>;
}

export default CartPage;
