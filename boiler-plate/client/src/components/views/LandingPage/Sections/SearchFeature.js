import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;
function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState();
  const searchHandler = e => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };
  return (
    <div>
      <Search
        style={{ width: 200 }}
        placeholder="input seach Keyword"
        onChange={searchHandler}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchFeature;
