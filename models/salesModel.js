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

const addSalesProducts = async (infosProducts) => {
  const querySaleId = `
  INSERT INTO sales(date) VALUE (now());
  `;
  const [{ insertId }] = await connection.execute(querySaleId);
  const queryAddProduct = `
  INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
  VALUE (?,?,?)
  `;

  infosProducts.map(async ({ productId, quantity }) => {
    await connection.execute(queryAddProduct, [insertId, productId, quantity]);
  });
  return insertId;
};

module.exports = {
  checkProductExists,
  addSalesProducts,
};
