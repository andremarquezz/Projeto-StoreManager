const { NotFoundError } = require('../errors/NotFoundError');
const salesModel = require('../models/salesModel');

const salesService = {
  checkProductExists: async (infosProducts) => {
    const responses = await Promise.all(
      infosProducts.map(({ productId }) => {
        const product = salesModel.checkProductExists(productId);
        return product;
      }),
    );
    const notFindProduct = responses.some((response) => response.exists === 0);
    if (notFindProduct) throw new NotFoundError('Product not found');
    return true;
  },

  checkSalesExists: async (id) => {
    const response = await salesModel.checkSalesExists(id);
    if (response.exists === 0) throw new NotFoundError('Sale not found');
    return true;
  },

  getAll: async () => {
    const data = await salesModel.getAll();
    const MIN_SALES = 1;
    if (data.length < MIN_SALES) throw new NotFoundError('Sale not found');
    return data;
  },

  getOne: async (id) => {
    const data = await salesModel.getOne(id);
    const MIN_SALES = 1;
    if (data.length < MIN_SALES) throw new NotFoundError('Sale not found');
    return data;
  },

  handleSaleProducts: async (infosProducts) => {
    await salesService.checkProductExists(infosProducts);
    const idSale = await salesModel.addSalesProducts(infosProducts);
    const productsSold = {
      id: idSale,
      itemsSold: infosProducts,
    };
    return productsSold;
  },

  updateProduct: async (saleId, products) => {
    await salesService.checkSalesExists(saleId);
    await salesService.checkProductExists(products);
    await Promise.all(
      products.map(({ productId, quantity }) =>
        salesModel.updateProduct(quantity, saleId, productId)),
    );
    const updatedProducts = await salesModel.findUpdatedSales(saleId);
    const response = {
      saleId,
      itemsUpdated: updatedProducts,
    };
    return response;
  },

  deleteProduct: async (id) => {
    await salesService.checkSalesExists(id);
    await salesModel.deleteProduct(id);
  },
};

module.exports = salesService;
