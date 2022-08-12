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

module.exports = {
  getAll,
  getOne,
  registerProduct,
};
