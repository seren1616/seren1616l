import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.images && props.detail.images.length >= 1) {
      let images = [];
      props.detail.images.map(item => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`
        });
      });
      setImages(images);
    }
  }, [props.detail]);
  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}
//return 부분 rendering 한 후에 useEffect를 라이프사이클을 한번 돌리는데
// 작동시킬때 useEffect의 []가 모니터링 타겟이 된다
//즉 []안의 값이 바뀔 때 마다 useEffect life cycle 한번씩 더 이 돌도록
export default ProductImage;
