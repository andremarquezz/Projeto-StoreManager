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

const createSalesId = async () => {
  const querySaleId = `
  INSERT INTO sales(date) VALUE (now());
  `;
  const [{ insertId }] = await connection.execute(querySaleId);
  return insertId;
};

const addSalesProducts = async (infosProducts) => {
  const saleId = await createSalesId();
  const queryAddProduct = `
  INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
  VALUE (?,?,?)
  `;

  infosProducts.map(async ({ productId, quantity }) => {
    await connection.execute(queryAddProduct, [saleId, productId, quantity]);
  });
  return saleId;
};

module.exports = {
  checkProductExists,
  addSalesProducts,
  createSalesId,
};
