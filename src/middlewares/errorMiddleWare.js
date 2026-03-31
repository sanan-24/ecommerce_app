
const ApiResponse = require("../utils/ApiResponse");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      err.message || "Internal Server Error",
      null
    )
  );
};

module.exports = errorMiddleware;