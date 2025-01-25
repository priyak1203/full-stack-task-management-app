const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || `Something went wrong, try again later`;
  res.status(statusCode).json({ msg });
};

module.exports = errorHandler;
