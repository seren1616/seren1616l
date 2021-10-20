import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registUser } from "../../../../src/_actions/user_action";
import { withRouter } from "react-router-dom";
function RegisterPage(props) {
  //함수 내에서 선언
  //1. useState
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //2. handler
  const nameHandler = e => {
    setName(e.currentTarget.value);
  };
  const emailHandler = e => {
    setEmail(e.currentTarget.value);
  };
  const passwordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  //3. dispature
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    console.log(Name);
    let body = { name: Name, email: Email, password: Password };

    dispatch(registUser(body)).then(res => {
      if (res.payload.success) {
        alert("회원가입에 성공하였습니다!");
        props.history.push("/");
      } else {
        alert("failed regist user");
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
        onSubmit={submitHandler}
      >
        <h2>회원가입(mongo DB)</h2>
        <label>name</label>
        <input type="text" value={Name} onChange={nameHandler} />
        <label>email</label>
        <input type="email" value={Email} onChange={emailHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={passwordHandler} />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
