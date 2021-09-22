const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증처리를 하는 곳
  //클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  //토크을 복호화 한 후 user를 찾늗다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //next로 돌아가면 돌아간 곳에서 req에 담긴 token과 user를 사용할 수 있도록 설정
    req.token = token;
    req.user = user;
    //지금 미들웨어다. 미들웨어에서 마지막 cb로 나아갈 수 있게 next를 해줘야한다.
    next();
  });

  //유저가 있으면 인증O, 유저가 없으면 인증 X
};

module.exports = { auth };
