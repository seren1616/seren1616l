//1. express모듈을 가져온다.
const router = require("express").Router();
//2. function을 이용해서 새로운 express app을 만들고

//axios 부분
router.get("/hello", (req, res) => {
  console.log("hello from board router");
  // return res.status(200).json({
  //   success: true,
  //   msg: "hello from board router"
  // });

  return res.status(200).json({
    success: true,
    msg: "hello from board router"
  });

  //res.send("hello from board router");
});

module.exports = router;
