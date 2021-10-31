import React, { useState } from "react";
import { Collapse, Checkbox, Radio } from "antd";

const { Panel } = Collapse;
function RadioBox(props) {
  const [Value, setValue] = useState(0);
  const handleChange = e => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };
  const rendorRadiobox = () =>
    props.list &&
    props.list.map((value, index) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {rendorRadiobox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
