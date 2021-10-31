const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      maxlength: 50
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    images: {
      type: Array,
      default: []
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },

    continents: {
      type: Number,
      default: 1
    },

    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
//search 값에 대한 옵션 설정 ($text:)
productSchema.index(
  {
    title: "text",
    description: "text"
  },
  {
    //중요도 옵션이다. title이 description보다 5배로 중요도 부여
    weights: {
      title: 5,
      description: 1
    }
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
