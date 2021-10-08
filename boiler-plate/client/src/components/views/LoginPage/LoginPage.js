//es7 download 후 reload
//rce : class component 생성
//rafe : allow function component 생성
//rfce : function component 생성
import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

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

    // Axios.get("http://localhost:9000/login/test").then(res => {
    //   console.log(res.data);
    // });

    const api = Axios.create({ baseURL: "http://localhost:9000" });
    api
      .post("/server/checkValidUser", null, {
        params: {
          userId: "ryula",
          userPw: "aa"
        }
      })
      .then(response => {
        console.log("from spring boot : " + response.status);
      })
      .catch(err => {
        console.log("err from springboot" + err);
      });

    //디스패치를 이용해서 액션을 취할 것
    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <form onSubmit={onSubmitHandler}>
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

export default LoginPage;
