const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [data] = await connection.execute(query);
  return data;
};

const getOne = async (id) => {
  const query = `
  SELECT * FROM StoreManager.products
  WHERE id = ?
  `;
  const [[data]] = await connection.execute(query, [id]);
  return data;
};

const registerProduct = async (name) => {
  const query = `
  INSERT INTO StoreManager.products(name)
  VALUE (?)
  `;
  await connection.execute(query, [name]);
  const querySelectProduct = `
  SELECT * FROM StoreManager.products
  WHERE name = ?
  `;
  const [[product]] = await connection.execute(querySelectProduct, [name]);
  return product;
};

const checkProductExists = async (productId) => {
  const query = `
  SELECT EXISTS(
  SELECT * FROM StoreManager.products
  WHERE id =  ? ) as 'exists'
  `;
  const [[response]] = await connection.execute(query, [productId]);
  return response;
};

const findUpdatedProduct = async (id) => {
  const query = `
SELECT id, name FROM products
WHERE id = ?
`;

  const [[updatedProduct]] = await connection.execute(query, [id]);
  return updatedProduct;
};

const updateProduct = async (name, id) => {
  const query = `
UPDATE products
SET name = ?
WHERE id = ?;
`;
  await connection.execute(query, [name, id]);
  const updatedProduct = await findUpdatedProduct(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const query = `
DELETE products FROM products
WHERE id = ?
`;
  await connection.execute(query, [id]);
};

const productsIncludeTerm = async (searchTerm) => {
  const query = `
SELECT * FROM products
WHERE name LIKE ?
`;
  const [products] = await connection.execute(query, [`%${searchTerm}%`]);
  return products;
};

module.exports = {
  getAll,
  getOne,
  registerProduct,
  updateProduct,
  checkProductExists,
  deleteProduct,
  productsIncludeTerm,
};
