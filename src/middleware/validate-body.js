const { validationResult } = require("express-validator");
const { ErrorHandler } = require("./utils")
const { STATUS_CODES } = require("../constants")

const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ErrorHandler(STATUS_CODES["UNPROCESSABLE_ENTITY"], errors.array());
  }
  next();
};

module.exports = {
  validateBody
};
