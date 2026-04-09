import { userRoles } from "../utils/userRoles.js";
import Enrollment from "../models/Enrollment.js";
import AppError from "../utils/appError.js";

const checkEnrollment = async (req, res, next) => {
  const courseId = req.params.courseId;

  if (
    req.user.role === userRoles.ADMIN ||
    req.user.role === userRoles.INSTRUCTOR
  ) {
    return next();
  }

  const isEnrolled = await Enrollment.findOne({
    course: courseId,
    student: req.user.id,
  });

  if (!isEnrolled) {
    return next(
      new AppError(
        "Access denied. You must be enrolled in this course to view its lessons.",
        403,
      ),
    );
  }

  next();
};

export default checkEnrollment;
