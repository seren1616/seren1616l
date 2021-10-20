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
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

var jwt = require("jsonwebtoken");

//application/x-www-form-urlencoded형태를 분석해서 가져올 수 있게 하는 설정
app.use(bodyParser.urlencoded({ extended: true }));

//application/json타입으로 된 것을 분석해서 가져올 수 있게 하는 설정
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/api/users/register", (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.

  //req.body안에는 {id:seren1616, pwd:aa}
  //user model에 저장.
  const user = new User(req.body);

  // save는 몽고디비 기능
  user.save((err, userInfo) => {
    if (err) {
      console.log("error save to DB" + err);
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true
    });
  });
});

//login router
app.post("/api/users/login", (req, res) => {
  //1.요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }
    //2. 요청한 이메일이 DB에 있으면 비밀번호와 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다"
        });

      //3. 비밀번호까지 같다면 user를 위한 토큰을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장한다. 어디에? 쿠키/로컬스토리지 = >F12에서 Application
        return res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //auth라는 미들웨어는, end point인 /app/users/auth 에서
  //callback (req,res) 하기 전에 중간에 실행하는 것
  //여기까지 미들웨어를 통과해서 왔다는 얘기는
  //Auth 가 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  //미들웨어인 auth에서 (req.user=user)에서 _id를 가져와서 찾은 것
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      token: ""
    },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    }
  );
});
app.listen(port, () => console.log("Example App listening port ${port}"));
