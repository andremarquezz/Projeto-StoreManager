class CustomErrors extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

module.exports = {
  CustomErrors,
};
