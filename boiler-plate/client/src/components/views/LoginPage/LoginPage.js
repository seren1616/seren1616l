//es7 download 후 reload
//rce : class component 생성
//rafe : allow function component 생성
//rfce : function component 생성
import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const emailHandler = e => {
    setEmail(e.currentTarget.value);
  };
  const passwordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = e => {
    //이걸 안하면 refresh되어서 아래의 해야할 일의 코드가 실행되지 않는다.
    e.preventDefault();
    let body = { email: Email, password: Password };
    // Axios.get("http://localhost:9000/login/test").then(console.log("response"));
    // //디스패치를 이용해서 액션을 취할 것
    // dispatch(loginUser(body)).then(response => {
    //   if (response.payload.loginSuccess) {
    //     props.history.push("/");
    //   } else {
    //     alert("error");
    //   }
    // });

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        alert("반갑습니다!");
        props.history.push("/");
        console.log(response.payload);
      } else {
        alert("err0r");
      }
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
        onSubmit={onSubmitHandler}
      >
        <label>email</label>
        <input type="email" value={Email} onChange={emailHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={passwordHandler} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
