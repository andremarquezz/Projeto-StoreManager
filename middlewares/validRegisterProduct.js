const { CustomErrors } = require('../errors/CustomError');

const validRegistrationProduct = (req, _res) => {
  const MIN_CARACTERES = 5;
  const { name } = req.body;
  if (!name) throw new CustomErrors('"name" is required', 400);
  if (name.length < MIN_CARACTERES) {
    throw new CustomErrors(
      '"name" length must be at least 5 characters long',
      422,
    );
  }
};

module.exports = {
  validRegistrationProduct,
};
