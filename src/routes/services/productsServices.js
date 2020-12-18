const MongoProduct = require("../../models/product/productMongo");
const Product = require("./../../models/product/Product");

const getAllProducts = async () => {
  try {
    const products = await MongoProduct.find();
    const productsResponse = formatProductListForResponse(products);
    return productsResponse;
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const getAvailableProducts = async () => {
  try {
    const products = await MongoProduct.find({ availability: true });
    const productsResponse = formatProductListForResponse(products);
    return productsResponse;
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const createProduct = async (product) => {
  try {
    if (product) {
      const newProduct = new MongoProduct(product);
      await newProduct.save();
      return "Product Saved Successfully";
    } else {
      return "Error, Product was not Saved";
    }
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const getProductInfoById = async (idProduct) => {
  try {
    const productResponse = await MongoProduct.findById(idProduct);
    const productFinal = new Product();
    productFinal.id = productResponse._id ?? "";
    productFinal.description = productResponse.description ?? "";
    productFinal.dimensions = productResponse.dimensions ?? "";
    productFinal.price = productResponse.price ?? 0;
    productFinal.weight = productResponse.weight ?? 0;
    productFinal.color = productResponse.color ?? "";
    productFinal.rating = productResponse.rating ?? 0;
    productFinal.availability = productResponse.availability ?? false;
    return productFinal;
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const updateProduct = async (idProduct, productToUpdate) => {
  try {
    if (productToUpdate) {
      await MongoProduct.update({ _id: idProduct }, productToUpdate);
      return "Product Updated Succesfully";
    } else {
      return "Error, Product was not Updated";
    }
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const updateProductAvailability = async (idProduct) => {
  try {
    const product = await MongoProduct.findById(idProduct);
    product.availability = !product.availability;
    await product.save();
    return "Product Availability was Updated Successully";
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const deleteProduct = async (idProduct) => {
  try {
    await MongoProduct.remove({ _id: idProduct });
    return "Product was Removed Succesfully";
  } catch (error) {
    throw new Error("Error: ", error);
  }
};

const formatProductListForResponse = (products = []) => {
  const product = new Product();
  const productsResponse = products.map((prod) => {
    product.id = prod._id ?? "";
    product.description = prod.description ?? "";
    product.dimensions = prod.dimensions ?? "";
    product.price = prod.price ?? 0;
    product.weight = prod.weight ?? 0;
    product.color = prod.color ?? "";
    product.rating = prod.rating ?? 0;
    product.availability = prod.availability ?? false;
    return product;
  });
  return productsResponse;
};

module.exports = {
  getAll: getAllProducts,
  getAvailable: getAvailableProducts,
  new: createProduct,
  productInfo: getProductInfoById,
  editProduct: updateProduct,
  editAvailability: updateProductAvailability,
  delete: deleteProduct,
};
