import { validationResult } from "express-validator";

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const err = new Error("Validation failed");
  err.validationErrors = errors.array();
  next(err);
};

export default validate;
