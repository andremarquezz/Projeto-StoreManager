const express = require('express');
const ProductServices = require('../services/productsService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await ProductServices.getAll();
  return res.status(products.code).json(products.data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductServices.getOne(id);
  return res.status(product.code).json(product.data);
});

module.exports = router;
