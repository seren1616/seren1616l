const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10; //salt를 만들 때, 몇글자?
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

//user모델에 user 정보를 저장하기 전에 function을 한다는 것이다.
userSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    //callback함수, salt를 제대로 생성하지 못했다면 err를 가져오고
    //salt를 제대로 생성했다면 salt를 가져온다
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        //hash는 암호화 된 비밀번호
        if (err) return next(err); //err가 있으면 돌려보내고
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
  //위의 로직이 다 수행한 뒤에, parameter의  next라는 function이 실행된다
  //index.js의 user.save 함수 부분으로 next를보내버린다.
});

//여기에서 cb(callback)이란 익명콜백함수, cb에(err,isMatch)를 넣어서 호출한 곳의 function에 넣어준다.
userSchema.methods.comparePassword = function(plainPassword, cb) {
  //plainPassword 1234567 암호화된 비밀번호와 같은지 check를 하는 방법?
  //plain을 암호화여 hash비밀번호랑 같은지 비교
  //this.password==userSchema.password
  bcrypt.compare(plainPassword, this.password, (err, same) => {
    if (err) return cb(err);
    cb(null, same);
  });
};

userSchema.methods.generateToken = function(cb) {
  //jsonwebtoken을 이용해서 토큰을 생성하기
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  jwt.verify(token, "secretToken", function(err, decoded) {
    //user id를 이용해서 유저를 찾은 다음에
    //client에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

//model로 schema를 감싸야 하는데, 미리 정의되어 사용할 schema를 감싸는 model의
//이름도 같이 넣어준다. 그러면 User라는 모델을 객체로 만들어줘서
//다른 모듈에서도 사용할 수 있도록 module.exports 해준다.
const User = mongoose.model("User", userSchema);

module.exports = { User };
