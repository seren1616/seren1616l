//rcfe
import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import { dispatch } from "react-redux";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" }
];

function UploadProductPage(props) {
  const [TitleValue, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState("");

  const titleChangeHandler = e => {
    setTitle(e.currentTarget.value);
  };
  const descriptionChangeHandler = e => {
    setDescription(e.currentTarget.value);
  };
  const priceChangeHandler = e => {
    setPrice(e.currentTarget.value);
  };
  const continentChangeHandler = e => {
    setContinent(e.currentTarget.value);
  };

  const uploadImages = newImages => {
    setImages(newImages);
  };
  const submitHandler = e => {
    console.log("upload to DB");
    e.preventDefault();
    if (!TitleValue || !Description || !Price || !Continent || !Images) {
      return alert("모든 값을 넣어주세요.");
    }
    const body = {
      //로그인 된 사람의 ID를 넣어줘야 한다.
      writer: props.user.userData._id,
      title: TitleValue,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent
    };
    Axios.post("/api/product", body).then(res => {
      if (res.data.success) {
        alert("상품 업로드에 성공했습니다.");
        console.log(body);
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBotton: "2rem" }}>
        <Title level={2}>UploadProductPage</Title>
      </div>

      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={uploadImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={TitleValue} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
