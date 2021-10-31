import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  const handleToggle = _id => {
    //누른 것의 index를 구하고
    const currentIndex = Checked.indexOf(_id);
    //복사
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      //없으면 -1이니까 push
      newChecked.push(_id);
    } else {
      //있으면 toggle(true->false)해야해서 list에서 삭제
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () => {
    console.log("checkbox data  : " + props.list[0].name);
    //첫번째 부분이 true이면 두번째(&&뒤)가 실행된다.
    return (
      props.list &&
      props.list.map((value, index) => (
        <React.Fragment key={index}>
          <Checkbox
            onChange={() => handleToggle(value._id)}
            checked={Checked.indexOf(value._id) === -1 ? false : true}
          />
          <span>{value.name}</span>
        </React.Fragment>
      ))
    );
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
