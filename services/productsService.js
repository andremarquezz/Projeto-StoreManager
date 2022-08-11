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

module.exports = {
  getAll,
  getOne,
};
