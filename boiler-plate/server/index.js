//back-end start point
//expressjs.com/en/starter/hello-world.html

//1. express모듈을 가져온다.
const express = require("express");
//2. function을 이용해서 새로운 express app을 만들고
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const boardRouter = require("./routes/BoardApi");
const productRouter = require("./routes/product");
const usersRouter = require("./routes/users");

var jwt = require("jsonwebtoken");

//application/x-www-form-urlencoded형태를 분석해서 가져올 수 있게 하는 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", usersRouter);
app.use("/api/board", boardRouter);
app.use("/api/product", productRouter);

//application/json타입으로 된 것을 분석해서 가져올 수 있게 하는 설정
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("mongoDB connected..."))
  .catch(err => console.log("mongoDB connect error, " + err));

//root dir에 helloworld출력
app.get("/", (req, res) => res.send("hello world  gg"));

//axios 부분
app.get("/api/hello/", (req, res) => {
  //둘다 web의 console에 뿌려진다.
  //res.send("안녕하세요~");
  return res.json({ successMsg: "안녕하세요!!!" });
});

app.listen(port, () => console.log(`server App listening port : ${port}`));
