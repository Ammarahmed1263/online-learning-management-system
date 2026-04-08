import Log from "../models/Log.js";

const logAction = async (action, userId, details) => {
  try {
    await Log.create({
      action,
      user: userId,
      details,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Critical Logging Failure:", error);
    }
  }
};

export default logAction;
