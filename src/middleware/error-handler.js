const { logger } = require('../utils/logger');
const { STATUS_CODES } = require('../constants')

const errorHandler = (
  err,
  req,
  res,
  next
) => {
    logger.error(err.message);
    statusCode = err.statusCode || STATUS_CODES["INTERNAL_SERVER_ERROR"];

    res
        .status(statusCode)
        .json(({
            errors: [...err.message]
        }));
};

module.exports = {
  errorHandler
}
