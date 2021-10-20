//rfce : function component 생성
import react, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertBoard } from "../../../_actions/board_action";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Board(props) {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState("");
  const [Contents, setContents] = useState("");
  const [Password, setPassword] = useState("");
  let isSecret = false;
  const titleHandler = e => {
    setTitle(e.currentTarget.value);
  };
  const contentsHandler = e => {
    setContents(e.currentTarget.value);
  };
  const passwordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHander = e => {
    if (Password.length > 0) isSecret = true;
    //alert(Title + "," + Contents + "," + isSecret);
    let body = {
      userId: "seren",
      title: Title,
      contents: Contents,
      isSecret: isSecret,
      password: Password
    };

    // dispatch(insertBoard(JSON.stringify(body))).then(res => {
    //   if (res.payload.status) {
    //     alert("success upload.");
    //     // props.history.push("/");
    //     console.log(res.payload.status);
    //   } else {
    //     alert("failed upload. please try again");
    //     console.log(res.payload.status);
    //   }
    // });
    e.preventDefault();
    const api = axios.create({ baseURL: "http://localhost:9000" });
    api
      .post("/server/board/insert", null, {
        params: {
          userId: "seren",
          title: Title,
          contents: Contents,
          isSecret: isSecret,
          password: Password
        }
      })
      .then(response => {
        alert("successfully uploaded ( " + response.status + ")" + Title);
      })
      .catch(err => {
        alert("err from springboot" + err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHander}
      >
        <label> * title</label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={Title}
          onChange={titleHandler}
        />
        <label> * contents</label>
        <textarea
          placeholder="내용을 입력하세요"
          value={Contents}
          onChange={contentsHandler}
        />
        <label>password</label>
        <input type="password" value={Password} onChange={passwordHandler} />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
export default withRouter(Board);
