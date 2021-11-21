import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_action";

function ProductInfo(props) {
  const dispatch = useDispatch();
  const clickHandler = () => {
    console.log("**add to cart");
    //필요한 정보를 카트 필드에 넣어준다.
    //상품 id, 갯수, date
    //dispatch action 이름 : add to cart
    dispatch(addToCart(props.detail._id));
  };
  return (
    <div>
      <Descriptions title="Product infomation">
        <Descriptions.Item label="Price">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button sise="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
