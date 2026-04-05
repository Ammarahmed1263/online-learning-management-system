import AppError from "../utils/appError.js";

const allowTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to access this resource", 403),
      );
    }
    next();
  };
};

export default allowTo;
