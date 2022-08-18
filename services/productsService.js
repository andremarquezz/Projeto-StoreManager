const { NotFoundError } = require('../errors/NotFoundError');
const ProductModel = require('../models/productsModel');

const checkProductExists = async (id) => {
  const response = await ProductModel.checkProductExists(id);
  if (response.exists === 0) throw new NotFoundError('Product not found');
};

const getAll = async () => {
  const data = await ProductModel.getAll();
  if (!data) throw new NotFoundError('Product not found');
  const response = { code: 200, data };
  return response;
};

const getOne = async (id) => {
  const data = await ProductModel.getOne(id);
  if (!data) throw new NotFoundError('Product not found');
  const response = { code: 200, data };
  return response;
};

const registerProduct = async (name) => {
  const data = await ProductModel.registerProduct(name);
  if (!data) throw new CustomErrors('Problema ao cadastrar produto', 500);
  const response = { code: 201, data };
  return response;
};

const updateProduct = async (name, id) => {
  await checkProductExists(id);
  const response = await ProductModel.updateProduct(name, id);
  if (!response) throw new CustomErrors('Problema ao atualizar o produto', 500);
  return response;
};

const productsIncludeTerm = async (searchTerm) => {
  let products = await ProductModel.productsIncludeTerm(searchTerm);
  if (products.length <= 0) products = await ProductModel.getAll;
  return products;
};

const deleteProduct = async (id) => {
  await checkProductExists(id);
  await ProductModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getOne,
  registerProduct,
  updateProduct,
  deleteProduct,
  productsIncludeTerm,
};
