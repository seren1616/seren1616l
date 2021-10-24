import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

export default function(SpecificComponent, link, option, adminRoute = null) {
  //option : null (아무나 출입이 가능한 페이지)
  //true :  로그인한 유저만 출입이 가능한 페이지
  //false : 로그인 한 유저는 출입이 불가능한 페이지
  function AthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const newUserPage = ["/", "/login", "/register"];
    const loginUserPage = ["/", "/tags", "/board", "/product/upload"];
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(res => {
        let urlLink = "/";
        console.log(res);
        if (!res.payload.isAuth) {
          //로그인X : /, /login, /register
          for (let i = 0; i < newUserPage.length; i++) {
            if (link === newUserPage[i]) {
              urlLink = link;
            }
          }

          props.history.push(urlLink);
        } else {
          //로그인 O : /, !/login, !/register
          for (let i = 0; i < loginUserPage.length; i++) {
            if (link === loginUserPage[i]) {
              urlLink = link;
            }
          }
          props.history.push(urlLink);
        }

        // if (!res.payload.isAuth) {
        //   //로그인 하지 않은 상태
        //   console.log("login을 먼저 하세요");
        //   if (option) {
        //     props.history.push("/login");
        //   }
        // } else {
        //   //로그인한 상태
        //   if (adminRoute && !res.payload.isAdmin) {
        //     console.log("auth : 일반사용자");
        //     props.history.push("/");
        //   } else {
        //     if (option === false) {
        //       console.log("auth : admin 사용자");
        //       props.history.push("/");
        //     }
        //   }
        // }
      });
    }, []);
    return <SpecificComponent {...props} user={user} />;
  }

  return AthenticationCheck;
}
