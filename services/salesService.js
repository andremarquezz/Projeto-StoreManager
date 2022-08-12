const { CustomErrors } = require('../errors/CustomError');
const salesModel = require('../models/salesModel');

const checkProductExists = (infosProducts) => {
  infosProducts.map(async ({ productId }) => {
    const product = await salesModel.checkProductExists(productId);
    if (product.exists === 0) throw new CustomErrors('Product not found', 404);
  });
};

const handleSaleProducts = (infosProducts) => {
  checkProductExists(infosProducts);
  infosProducts.map(async ({ productId, quantity }) => {
    await salesModel.addSalesProducts(productId, quantity);
  });
};

module.exports = {
  handleSaleProducts,
};
