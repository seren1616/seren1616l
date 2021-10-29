import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import { set } from "mongoose";

function LadingPage(props) {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(2);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit
    };
    getProducts(body);
  }, []);

  const getProducts = body => {
    axios.post("/api/product/products", body).then(res => {
      if (res.data.success) {
        console.log(res.data);
        if (body.loadMore) {
          setProducts([...Products, ...res.data.productsInfo]);
        } else {
          console.log("length : " + res.data.PostSize);
          setProducts(res.data.productsInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: Skip,
      limit: Limit,
      loadMore: true
    };
    getProducts(body);
    setSkip(skip);
  };

  const onClickHandler = () => {
    axios.get("/api/users/logout").then(res => {
      if (res.data.success) {
        alert("logout success");
        props.history.push("/login");
      } else {
        alert("logout failed");
      }
    });
  };
  const renderCards = Products.map((product, index) => {
    console.log(product);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    /* v1 bolier-plate*/
    /*<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <div>
        <h2>
          landing page
          <h4>router infomation</h4>
        </h2>

        <ul>
          lading page : <a href="localhost:3000">localhost:3000</a>
        </ul>
        <ul>
          login page : <a href="/login">localhost:3000/login</a>
        </ul>
        <ul>
          회원가입 : <a href="/register">localhost:3000/register</a>
        </ul>
      </div>
      <button onClick={onClickHandler}>log Out</button>
    </div>
    */
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
          {PostSize - Products.length}
        </h2>
      </div>
      <Row gutter={(16, 16)}>{renderCards}</Row>
      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LadingPage;
