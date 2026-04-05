import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("No token provided", 401));
  }

  const token = authHeader.split(" ").pop();

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Token expired, please log in again", 401));
    }
    return next(new AppError("Invalid token", 401));
  }
};

export default authorize;
