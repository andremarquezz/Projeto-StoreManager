const { CustomErrors } = require('../errors/CustomError');
const ProductModel = require('../models/productsModel');

const getAll = async () => {
  const data = await ProductModel.getAll();
  if (!data) throw new CustomErrors('Product not found', 404);
  const response = { code: 200, data };
  return response;
};

const getOne = async (id) => {
  const data = await ProductModel.getOne(id);
  if (!data) throw new CustomErrors('Product not found', 404);
  const response = { code: 200, data };
  return response;
};

const registerProduct = async (name) => {
  const data = await ProductModel.registerProduct(name);
  if (!data) throw new CustomErrors('Problema ao cadastrar produto', 500);
  const response = { code: 201, data };
  return response;
};

const checkProductExists = async (id) => {
  const response = await ProductModel.checkProductExists(id);
  if (response.exists === 0) throw new CustomErrors('Product not found', 404);
};

const updateProduct = async (name, id) => {
  await checkProductExists(id);
  const response = await ProductModel.updateProduct(name, id);
  if (!response) throw new CustomErrors('Problema ao atualizar o produto', 500);
  return response;
};

module.exports = {
  getAll,
  getOne,
  registerProduct,
  updateProduct,
};
