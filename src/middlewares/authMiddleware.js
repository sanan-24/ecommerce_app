// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const verifyToken = (req, res, next) => {
  try {
    // token get from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(401, "No token provided");
    }

    // format: Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Invalid token format");
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user id attach within request 
    req.userId = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;