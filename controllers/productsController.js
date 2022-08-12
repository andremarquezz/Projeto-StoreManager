const ProductServices = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await ProductServices.getAll();
  return res.status(products.code).json(products.data);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const product = await ProductServices.getOne(id);
  return res.status(product.code).json(product.data);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const registeredProduct = await ProductServices.registerProduct(name);
  return res.status(registeredProduct.code).json(registeredProduct.data);
};

module.exports = {
  getAll,
  registerProduct,
  getOne,
};
