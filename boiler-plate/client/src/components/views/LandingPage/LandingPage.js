import React, { useEffect } from "react";
import axios from "axios";
function LadingPage() {
  useEffect(() => {
    axios.get("/api/hello").then(response => console.log(response.data));
  }, []);

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
    </div>
  );
}

export default LadingPage;
