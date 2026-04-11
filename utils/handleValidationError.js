import AppError from "./appError.js";

const handleValidationError = (err) =>
  new AppError(
    "Validation failed",
    400,
    err.validationErrors.reduce((acc, e) => {
      if (!acc[e.path]) {
        acc[e.path] = e.msg;
      }
      return acc;
    }, {}),
  );

export default handleValidationError;
