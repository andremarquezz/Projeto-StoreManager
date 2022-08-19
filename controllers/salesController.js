const SalesService = require('../services/salesService');

const salesController = {
  handleSaleProducts: async (req, res) => {
    const response = await SalesService.handleSaleProducts(req.body);
    res.status(201).json(response);
  },

  getAll: async (_req, res) => {
    const response = await SalesService.getAll();
    res.status(200).json(response);
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    const response = await SalesService.getOne(id);
    res.status(200).json(response);
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const response = await SalesService.updateProduct(Number(id), req.body);
    res.status(200).json(response);
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    await SalesService.deleteProduct(id);
    res.status(204).send();
  },
};

module.exports = salesController;
