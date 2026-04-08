import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";
import jsend from "../utils/jsend.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createLesson = async (req, res, next) => {
  const { title, content, courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  if (course.instructor.toString() !== req.user.id) {
    return next(new AppError("Not authorized", 403));
  }

  const lesson = await Lesson.create({
    title,
    content,
    courseId,
    instructorId: req.user.id,
  });

  return res.status(201).json(jsend.success({ lesson }));
};

export const getLessons = async (req, res) => {
  const features = new APIFeatures(
    Lesson.find().populate("courseId", "title"),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const lessons = await features.query;
  const total = await Lesson.countDocuments();

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;

  return res.status(200).json(
    jsend.success({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      lessons,
    }),
  );
};

export const getLesson = async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id).populate(
    "courseId",
    "title",
  );

  if (!lesson) {
    return next(new AppError("Lesson not found", 404));
  }

  return res.status(200).json(jsend.success({ lesson }));
};

export const updateLesson = async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(new AppError("Lesson not found", 404));
  }

  if (lesson.instructorId.toString() !== req.user.id) {
    return next(new AppError("Not authorized", 403));
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  return res.status(200).json(jsend.success({ lesson: updatedLesson }));
};

export const deleteLesson = async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(new AppError("Lesson not found", 404));
  }

  if (lesson.instructorId.toString() !== req.user.id) {
    return next(new AppError("Not authorized", 403));
  }

  await lesson.deleteOne();

  return res
    .status(200)
    .json(jsend.success({ message: "Lesson deleted successfully" }));
};
