const express = require("express");
const router = express.Router();

const Product = require("./../../models/product");

router.get("/all", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post("/add", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.send("Exito al guardar");
});

// update whole product propieries
router.put("/edit/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  await Product.update({ _id: idProduct }, req.body);
  res.send("Exito al actualizar todo el producto");
});

// update another way
router.put("/editavailability/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const product = await Product.findById(idProduct);
  product.availability = !product.availability;
  await product.save();
  res.send("Exito al actualizar availablity en el producto");
});

router.delete("/delete/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  await Product.remove({ _id: idProduct });
  res.send("Exito al eliminar el producto");
});

module.exports = router;
