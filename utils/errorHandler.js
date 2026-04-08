import jsend from "./jsend.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!error.isOperational) console.error(err);

  const statusCode = error.statusCode || 500;

  if (statusCode >= 400 && statusCode < 500) {
    return res
      .status(statusCode)
      .json(jsend.fail(error.data || { message: error.message }));
  }

  return res.status(500).json(
    jsend.error("Something went wrong"),
  );
};

export default errorHandler;
