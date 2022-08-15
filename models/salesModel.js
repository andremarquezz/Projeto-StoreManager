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

const checkSalesExists = async (id) => {
  const query = `
SELECT EXISTS(
  SELECT * FROM StoreManager.sales
  WHERE id =  ? ) as 'exists'
  `;
  const [[response]] = await connection.execute(query, [id]);
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

const getAllSales = async () => {
  const query = `
SELECT sp.sale_id AS saleId, sd.date AS date, sp.product_id AS productId, sp.quantity
FROM sales_products AS sp
INNER JOIN sales AS sd ON sp.sale_id = sd.id
ORDER BY saleId, productId
`;

  const [data] = await connection.execute(query);
  return data;
};

const getOneSales = async (id) => {
  const query = `
SELECT sd.date AS date, sp.product_id AS productId, sp.quantity
FROM sales_products AS sp
INNER JOIN sales AS sd ON sp.sale_id = sd.id
WHERE sale_id = ?
ORDER BY productId
`;

  const [data] = await connection.execute(query, [id]);
  return data;
};

const deleteProduct = async (id) => {
  const query = `
DELETE sp.*, s.*
FROM sales_products AS sp
INNER JOIN sales AS s ON sp.sale_id = s.id
WHERE s.id = ?;
`;
  await connection.execute(query, [id]);
};

module.exports = {
  checkProductExists,
  addSalesProducts,
  createSalesId,
  getAllSales,
  getOneSales,
  deleteProduct,
  checkSalesExists,
};
