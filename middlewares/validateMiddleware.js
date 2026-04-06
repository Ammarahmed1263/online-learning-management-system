import { validationResult } from "express-validator";
import AppError from "../utils/appError.js";

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const validationData = errors.array().reduce((acc, error) => {
    acc[error.path] = error.msg;
    return acc;
  }, {});

  next(new AppError("Validation failed", 400, validationData));
};

export default validate;
