const { NotFoundError } = require('../errors/NotFoundError');
const { ServerError } = require('../errors/ServerError');
const ProductsModel = require('../models/productsModel');

const productsService = {
  getAll: async () => {
    const data = await ProductsModel.getAll();
    if (!data) throw new NotFoundError('Product not found');
    return data;
  },
  getOne: async (id) => {
    const data = await ProductsModel.getOne(id);
    if (!data) throw new NotFoundError('Product not found');
    return data;
  },
  productsIncludeTerm: async (searchTerm) => {
    let products = await ProductsModel.productsIncludeTerm(searchTerm);
    if (products.length <= 0) products = await ProductsModel.getAll();
    return products;
  },
  checkProductExists: async (id) => {
    const response = await ProductsModel.checkProductExists(id);
    if (response.exists === 0) throw new NotFoundError('Product not found');
    return true;
  },
  registerProduct: async (name) => {
    const data = await ProductsModel.registerProduct(name);
    if (!data) throw new ServerError('Problema ao cadastrar produto');
    return data;
  },
  updateProduct: async (name, id) => {
    await productsService.checkProductExists(id);
    const response = await ProductsModel.updateProduct(name, id);
    if (!response) throw new ServerError('Problema ao atualizar o produto');
    return response;
  },
  deleteProduct: async (id) => {
    await productsService.checkProductExists(id);
    await ProductsModel.deleteProduct(id);
  },
};

module.exports = productsService;
