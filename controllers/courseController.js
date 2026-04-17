import Course from "../models/Course.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import jsend from "../utils/jsend.js";
import AppError from "../utils/appError.js";
import logAction from "../utils/logger.js";
import logActions from "../utils/logActions.js";
import APIFeatures from "../utils/apiFeatures.js";

const createCourse = asyncWrapper(async (req, res, next) => {
  const { title, description, price, category } = req.body;
  const userId = req.user.id;

  const newCourse = new Course({
    title,
    description,
    price,
    category,
    instructor: userId,
  });
  await newCourse.save();

  await logAction(
    logActions.CREATE_COURSE,
    userId,
    `Created course ${newCourse._id} (${newCourse.title})`,
  );

  return res.status(201).json(jsend.success({ newCourse }));
});

const getCourses = asyncWrapper(async (req, res, next) => {
  const keyword = req.query.keyword?.trim();
  const queryWithoutKeyword = { ...req.query };
  delete queryWithoutKeyword.keyword;

  const courseSearchQuery = keyword
    ? {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }
    : {};

  const features = new APIFeatures(
    Course.find(courseSearchQuery)
      .populate("category", "name description")
      .populate("instructor", "userName email"),
    queryWithoutKeyword,
  )
    .filter()
    .sort()
    .limitFields();

  const total = await features.query.clone().countDocuments();

  features.paginate();

  const courses = await features.query.lean();

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;

  return res.status(200).json(
    jsend.success({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      results: courses.length,
      courses,
    }),
  );
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id)
    .populate("category", "name description")
    .populate("instructor", "userName email")
    .lean();
  if (!course) return next(new AppError("Course not found", 404));

  return res.status(200).json(jsend.success({ course }));
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;
  const course = await Course.findById(id);
  // Check if it exists
  if (!course) {
    return next(new AppError("Course not found", 404));
  }
  //  OWNERSHIP CHECK
  if (course.instructor.toString() !== req.user.id.toString()) {
    return next(
      new AppError("You do not have permission to modify this course", 403),
    );
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { title, description, price, category },
    { new: true, runValidators: true },
  ).lean();

  await logAction(
    logActions.UPDATE_COURSE,
    req.user.id,
    `Updated course ${updatedCourse._id} (${updatedCourse.title})`,
  );

  return res.status(200).json(jsend.success({ updatedCourse }));
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  // Check if it exists
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  //  OWNERSHIP CHECK
  if (course.instructor.toString() !== req.user.id.toString()) {
    return next(
      new AppError("You do not have permission to modify this course", 403),
    );
  }

  await logAction(
    logActions.DELETE_COURSE,
    req.user.id,
    `Deleted course ${course._id} (${course.title})`,
  );

  await Course.findByIdAndDelete(req.params.id);

  return res.status(200).json(jsend.success(null));
});

export { createCourse, getCourses, getCourse, updateCourse, deleteCourse };
