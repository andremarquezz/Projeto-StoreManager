const express = require('express');
const ProductServices = require('../services/productsService');

const router = express.Router();

const rescue = require('../utils/rescue');

router.get('/', rescue(async (_req, res) => {
  const products = await ProductServices.getAll();
  return res.status(products.code).json(products.data);
}));

module.exports = router;
