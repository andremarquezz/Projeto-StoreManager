const ProductsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const products = await ProductsService.getAll();
    return res.status(products.code).json(products.data);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const product = await ProductsService.getOne(id);
    return res.status(product.code).json(product.data);
  },
  productsIncludeTerm: async (req, res) => {
    const { q: searchTerm } = req.query;
    const products = await ProductsService.productsIncludeTerm(searchTerm);
    res.status(200).json(products);
  },
  registerProduct: async (req, res) => {
    const { name } = req.body;
    const registeredProduct = await ProductsService.registerProduct(name);
    return res.status(registeredProduct.code).json(registeredProduct.data);
  },
  updateProduct: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const updatedProduct = await ProductsService.updateProduct(name, id);
    res.status(200).json(updatedProduct);
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    await ProductsService.deleteProduct(id);
    res.status(204).send();
  },
};

module.exports = productsController;
