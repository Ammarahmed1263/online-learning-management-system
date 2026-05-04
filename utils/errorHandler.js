import jsend from "./jsend.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!error.isOperational) console.error("ERROR: ", err);

  const statusCode = error.statusCode || 500;

  if (statusCode >= 400 && statusCode < 500) {
    return res
      .status(statusCode)
      .json(jsend.fail(error.data || { message: error.message }));
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      status: "error",
      message: error.message,
      stack: error.stack,
    });
  }

  return res.status(500).json(
    jsend.error("Something went wrong. Please try again later."),
  );
};

export default errorHandler;
