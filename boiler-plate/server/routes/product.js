//1. express모듈을 가져온다.
const router = require("express").Router();
const multer = require("multer");
const { Product } = require("../models/Product");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const qs = require("querystring");

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
  let term = req.body.searchTerm;

  let findArgs = {};
  console.log("1. req.body.filters : ", req.body.filters);

  for (let key in req.body.filters) {
    console.log("2. key : ", key);
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          //greater than equal
          $gte: req.body.filters[key][0],
          //less than equal
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log("findArgs", findArgs);
  console.log("search Term", term);
  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
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
  } else {
    Product.find(findArgs)
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
  }
});

router.get("/products_by_id", (req, res) => {
  //product id를 이용해서 DB에서 product id와 같은 상품의 정보를 가져온다.
  //쿼리를 이용해서 값을 가져올때는
  console.log("/products_by_id", qs.escape(req.query.id));
  let type = qs.escape(req.query.type);
  let productIds = qs.escape(req.query.id);

  if (type === "array") {
    //id=123,12345,454,23로 온 걸 productIds=['123','12345','454','23']으로 만들어줘야한다.
    let ids = req.query.id.split(",");
    productIds = ids.map(item => {
      return item;
    });
  }
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    });
});

module.exports = router;
