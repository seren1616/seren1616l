//1. express모듈을 가져온다.
const router = require("express").Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//2. function을 이용해서 새로운 express app을 만들고
const storage = multer.diskStorage({
  //어디에 파일이 저장되는지
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //cb(null, +file.fieldname + '-' + uniqueSuffix)
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single("file");
//axios 부분
router.post("/image", (req, res) => {
  //가져온 이미지를 저장한다.
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);
  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
