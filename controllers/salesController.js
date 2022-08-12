const SalesService = require('../services/salesService');

const handleSaleProducts = async (req, res) => {
  const response = SalesService.handleSaleProducts(req.body);
  res.status(201).json(response);
};

module.exports = {
  handleSaleProducts,
};
