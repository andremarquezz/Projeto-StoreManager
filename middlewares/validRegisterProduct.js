const { CustomErrors } = require('../errors/CustomError');

const validRegistrationProduct = (req, _res, next) => {
  const MIN_CARACTERS = 5;
  const { name } = req.body;
  if (!name) throw new CustomErrors('"name" is required', 400);
  if (name.length < MIN_CARACTERS) {
    throw new CustomErrors(
      '"name" length must be at least 5 characters long',
      422,
    );
  }
  next();
};

module.exports = {
  validRegistrationProduct,
};
