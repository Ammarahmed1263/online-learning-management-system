import Enrollment from "../models/Enrollment.js";
import AppError from "../utils/appError.js";
import jsend from "../utils/jsend.js";

const getAllEnrollments = async (req, res, next) => {
  const enrollments = await Enrollment.find()
    .populate("student", "userName email")
    .populate("course", "title price");

  return res.status(200).json(
    jsend.success({
      results: enrollments.length,
      enrollments,
    }),
  );
};

const enrollStudent = async (req, res, next) => {
  const studentId = req.user.id;
  const courseId = req.body.courseId;

  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (existingEnrollment) {
    throw new AppError("You are already enrolled in this course.", 400);
  }

  const newEnrollment = await Enrollment.create({
    student: studentId,
    course: courseId,
  });

  res.status(201).json(
    jsend.success({
      enrollment: newEnrollment,
    }),
  );
};

const unEnrollStudent = async (req, res, next) => {
  const { courseId } = req.params;
  const studentId = req.user.id;

  const deletedEnrollment = await Enrollment.findOneAndDelete({
    course: courseId,
    student: studentId,
  });

  if (!deletedEnrollment) {
    throw new AppError("You are not enrolled in this course.", 404);
  }

  res.status(200).json(
    jsend.success({
      message: "Successfully unEnrolled from the course.",
    }),
  );
};

const getMyCourses = async (req, res, next) => {
  const userId = req.user.id;

  const enrollments = await Enrollment.find({ student: userId })
    .populate("course", "title description price -_id")
    .lean();

  const courses = enrollments.map((enrollment) => enrollment.course);

  res.status(200).json(
    jsend.success({
      results: courses.length,
      courses,
    }),
  );
};

export { enrollStudent, unEnrollStudent, getMyCourses, getAllEnrollments };
