//1. express모듈을 가져온다.
const router = require("express").Router();
const multer = require("multer");
const { Product } = require("../models/Product");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
  console.log("product body : " + req.body.description);
  console.log("product model : " + product);
  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  //product collection에 들어있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 16;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Product.find()
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productsInfo) => {
      console.log("len:" + productsInfo.length);
      if (err) return res.status(400).json({ success: false, err });
      else
        return res.status(200).json({
          success: true,
          productsInfo,
          postSize: parseInt(productsInfo.length)
        });
    });
});

module.exports = router;
