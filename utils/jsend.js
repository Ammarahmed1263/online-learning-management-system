const jsend = {
  success: (data) => ({ status: "success", data }),
  fail: (data) => ({ status: "fail", data }),
  error: (message, data = null) => ({ status: "error", message, data }),
};

export default jsend;