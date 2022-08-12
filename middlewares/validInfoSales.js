const joi = require('joi');
const { CustomErrors } = require('../errors/CustomError');

const schemaInfoSales = joi.object({
  productId: joi.required(),
  quantity: joi.number().min(1).required(),
});

const validInfoSales = (req, _res, next) => {
  const infosProducts = req.body;
  infosProducts.forEach((infoProduct) => {
    const validate = schemaInfoSales.validate(infoProduct);
    const { error } = validate;
    if (error) {
      const messageError = error.details[0].message;
      const typeError = error.details[0].type;
      switch (typeError) {
        case 'any.required':
          throw new CustomErrors(messageError, 400);
        case 'number.min':
          throw new CustomErrors(messageError, 422);
        default:
          throw new CustomErrors(messageError, 500);
      }
    }
  });
  next();
};

module.exports = validInfoSales;
