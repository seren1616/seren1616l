const router = require("express").Router();

const { auth } = require("../middleware/auth");
const { User } = require("../models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/register", (req, res) => {
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
router.post("/login", (req, res) => {
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

router.get("/auth", auth, (req, res) => {
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
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history
  });
});

router.get("/logout", auth, (req, res) => {
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

router.post("/addToCart", auth, (req, res) => {
  //먼저  User Collection에 해당 유저의 정보를 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인

    let duplicate = false;
    userInfo.cart.forEach(item => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    //상품이 이미 있을때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(200).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
    //상품이 이미 있지 않을때
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
  //가져온 정보에서 카트에 넣으려 하는 상품이 이미 들어있는 지 확인
  //case 1 : 상품이 이미 있을 때
  //case 2:상품이 없을 때
});
module.exports = router;
