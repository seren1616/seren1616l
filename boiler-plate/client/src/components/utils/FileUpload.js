import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/fomr-data" }
    };
    formData.append("file", files[0]);
    axios.post("/api/product/image", formData, config).then(res => {
      if (res.data.success) {
        console.log("?" + res.data.filePath);

        setImages([...Images, res.data.filePath]);
        props.refreshFunction([...Images, res.data.filePath]);
        console.log(Images.length + "," + res.data.filePath);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  const deleteHandler = image => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid lightgray"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll"
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{
                minWidth: "300px",
                width: "300px",
                height: "240px"
              }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
