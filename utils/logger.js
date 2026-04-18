import Log from "../models/Log.js";
import AppError from "./appError.js";

const logAction = async (action, userId, details) => {
  try {
    await Log.create({
      action,
      user: userId,
      details,
    });
  } catch (error) {
    const errorMsg = `Failed to log ${action}: ${error.message}`;

    if (process.env.NODE_ENV === "development") {
      console.error(errorMsg);
      throw new AppError(errorMsg, 500);
    } else {
      console.error(errorMsg);
    }
  }
};

export default logAction;
