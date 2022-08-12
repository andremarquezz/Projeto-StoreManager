const express = require('express');
const {
  validRegistrationProduct,
} = require('../middlewares/validRegisterProduct');
const ProductsController = require('../controllers/productsController');

const router = express.Router();

router
  .route('/')
  .get(ProductsController.getAll)
  .post(validRegistrationProduct, ProductsController.registerProduct);

router.get('/:id', ProductsController.getOne);

module.exports = router;
