const connection = require('./connection');

const checkProductExists = async (productId) => {
  const query = `
  SELECT EXISTS(
  SELECT * FROM StoreManager.products
  WHERE id =  ? ) as 'exists'
  `;
  const [[response]] = await connection.execute(query, [productId]);
  return response;
};

const addSalesProducts = async (productId, quantity) => {
  const query = `
  INSERT INTO StoreManager.sales_products(product_id, quantity)
  VALUE (?,?)
  `;
  await connection.execute(query, [productId, quantity]);
};

module.exports = {
  checkProductExists,
  addSalesProducts,
};
