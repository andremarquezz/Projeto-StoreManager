const express = require('express');
const ProductServices = require('../services/productsService');

const router = express.Router();

router.get('/', async (_req, res) => {
  console.log('escutei');
  const products = await ProductServices.getAll();
  return res.status(products.code).json(products.data);
});

module.exports = router;
