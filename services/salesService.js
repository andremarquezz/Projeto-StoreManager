const { CustomErrors } = require('../errors/CustomError');
const salesModel = require('../models/salesModel');

const checkProductExists = async (infosProducts) => {
  const responses = await Promise.all(
    infosProducts.map(({ productId }) => {
      const product = salesModel.checkProductExists(productId);
      return product;
    }),
  );
  const notFindProduct = responses.some((response) => response.exists === 0);
  if (notFindProduct) throw new CustomErrors('Product not found', 404);
};

const handleSaleProducts = async (infosProducts) => {
  await checkProductExists(infosProducts);
  const idSale = await salesModel.addSalesProducts(infosProducts);
  const productsSold = {
    id: idSale,
    itemsSold: infosProducts,
  };
  return productsSold;
};

const getAllSales = async () => {
  const data = await salesModel.getAllSales();
  const MIN_SALES = 1;
  if (data.length < MIN_SALES) throw new CustomErrors('Sale not found', 404);
  return data;
};

const getOneSales = async (id) => {
  const data = await salesModel.getOneSales(id);
  const MIN_SALES = 1;
  if (data.length < MIN_SALES) throw new CustomErrors('Sale not found', 404);
  return data;
};

module.exports = {
  handleSaleProducts,
  getAllSales,
  getOneSales,
};
