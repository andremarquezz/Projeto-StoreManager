const SalesService = require('../services/salesService');

const handleSaleProducts = async (req, res) => {
  const response = await SalesService.handleSaleProducts(req.body);
  res.status(201).json(response);
};

const getAllSales = async (_req, res) => {
  const response = await SalesService.getAllSales();
  res.status(200).json(response);
};

const getOneSales = async (req, res) => {
  const { id } = req.params;
  const response = await SalesService.getOneSales(id);
  res.status(200).json(response);
};

module.exports = {
  handleSaleProducts,
  getAllSales,
  getOneSales,
};
