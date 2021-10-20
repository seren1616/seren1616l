import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
function LadingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then(response => console.log(response.data));
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then(res => {
      if (res.data.success) {
        alert("logout success");
        props.history.push("/login");
      } else {
        alert("logout failed");
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
      <div>
        <h2>
          landing page
          <h4>router infomation</h4>
        </h2>

        <ul>
          lading page : <a href="localhost:3000">localhost:3000</a>
        </ul>
        <ul>
          login page : <a href="/login">localhost:3000/login</a>
        </ul>
        <ul>
          회원가입 : <a href="/register">localhost:3000/register</a>
        </ul>
      </div>
      <button onClick={onClickHandler}>log Out</button>
    </div>
  );
}

export default withRouter(LadingPage);
