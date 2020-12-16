const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  description: String,
  dimensions: String,
  price: Number,
  weight: Number,
  availability: {
    type: Boolean,
    default: false,
  },
  color: String,
  rating: Number,
});

module.exports = mongoose.model("product", productSchema);
