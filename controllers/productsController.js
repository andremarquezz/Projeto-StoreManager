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

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const updatedProduct = await ProductServices.updateProduct(name, id);
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductServices.deleteProduct(id);
  res.status(204).send();
};

const productsIncludeTerm = async (req, res) => {
  const { q: searchTerm } = req.query;
  const products = await ProductServices.productsIncludeTerm(searchTerm);
  res.status(200).json(products);
};

module.exports = {
  getAll,
  getOne,
  registerProduct,
  updateProduct,
  deleteProduct,
  productsIncludeTerm,
};
