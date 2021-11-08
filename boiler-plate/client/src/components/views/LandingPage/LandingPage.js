import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import { set } from "mongoose";
import CheckBox from "./Sections/CheckBox";
import { continents, price } from "./Sections/Datas";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";

function LadingPage(props) {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(2);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  });

  const [SearchTerm, setSearchTerm] = useState();

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
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              {" "}
              <ImageSlider images={product.images} />{" "}
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });
  const showFilteredResults = filters => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters
    };
    getProducts(body);
    setSkip(0);
  };
  const handlePrice = value => {
    const data = price;
    let array = [];
    //여기에서 말하는 key는 price의 필드값이 아니라 자체적으로(내장) 가지는 index
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    //전달받은 category(=continents)에 filters의 값으로 업데이트 하는 것이다
    console.log("filters", filters);
    newFilters[category] = filters;
    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };
  const updateSearchTerm = value => {
    console.log("update search Term : ", value);
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: value
    };
    setSkip(0);
    setSearchTerm(value);
    getProducts(body);
  };
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
          {PostSize - Products.length}
        </h2>
      </div>
      {/*Filter*/}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/*Check Box continents들을 checkbox로 내려준다*/}
          <CheckBox
            list={continents}
            handleFilters={filters => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/*Radio Box*/}
          <RadioBox
            list={price}
            handleFilters={filters => handleFilters(filters, "price")}
          />
        </Col>
      </Row>
      {/*Search*/}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto"
        }}
      >
        <SearchFeature refreshFunction={newVal => updateSearchTerm(newVal)} />
      </div>
      {/*Cards*/}
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
