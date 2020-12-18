const express = require("express");
const router = express.Router();

const ProductService = require("./../services/productsServices");

router.get("/all", async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.send(products);
  } catch (error) {
    throw new Error("Error: ", error);
  }
});

router.get("/available", async (req, res) => {
  try {
    const products = await ProductService.getAvailable();
    res.send(products);
  } catch (error) {
    throw new Error("Error: ", error);
  }
});

router.post("/add", async (req, res) => {
  ProductService.new(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

router.get("/productinfo/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await ProductService.productInfo(idProduct);
    res.send(product);
  } catch (error) {
    throw new Error("Error: ", error);
  }
});

// update whole product propieries
router.put("/edit/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  ProductService.editProduct(idProduct, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

// update only one of its properties
router.put("/editavailability/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  ProductService.editAvailability(idProduct)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

router.delete("/delete/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  ProductService.delete(idProduct)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

module.exports = router;
