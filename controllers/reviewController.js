import Review from "../models/Review.js";
import Enrollment from "../models/Enrollment.js";
import AppError from "../utils/appError.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import jsend from "../utils/jsend.js";
import logAction from "../utils/logger.js";
import logActions from "../utils/logActions.js";
import { userRoles } from "../utils/userRoles.js";

const createReview = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;
  const studentId = req.user.id;
  const { rating, comment } = req.body;

  const enrollment = await Enrollment.findOne({
    course: courseId,
    student: studentId,
  });

  if (!enrollment) {
    return next(
      new AppError(
        "You must be enrolled in this course to leave a review.",
        403,
      ),
    );
  }

  const existingReview = await Review.findOne({
    course: courseId,
    student: studentId,
  });

  if (existingReview) {
    return next(new AppError("You have already reviewed this course.", 400));
  }

  const review = await Review.create({
    student: studentId,
    course: courseId,
    rating,
    comment,
  });

  await logAction(
    logActions.CREATE_REVIEW,
    studentId,
    `Student ${studentId} reviewed course ${courseId} with rating ${rating}`,
  );

  return res.status(201).json(jsend.success({ review }));
});

const getCourseReviews = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;

  const reviews = await Review.find({ course: courseId })
    .populate("student", "userName email")
    .lean();

  return res.status(200).json(
    jsend.success({
      results: reviews.length,
      reviews,
    }),
  );
});

const getMyReviews = asyncWrapper(async (req, res, next) => {
  const studentId = req.user.id;

  const reviews = await Review.find({ student: studentId })
    .populate("course", "title description")
    .lean();

  return res.status(200).json(
    jsend.success({
      results: reviews.length,
      reviews,
    }),
  );
});

const updateReview = asyncWrapper(async (req, res, next) => {
  const { id, courseId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findOne({ _id: id, course: courseId });

  if (!review) {
    return next(new AppError("Review not found.", 404));
  }

  if (review.student.toString() !== req.user.id.toString()) {
    return next(
      new AppError("You do not have permission to edit this review.", 403),
    );
  }

  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;

  const updatedReview = await review.save();

  await logAction(
    logActions.UPDATE_REVIEW,
    req.user.id,
    `Updated review ${id} on course ${courseId}`,
  );

  return res.status(200).json(jsend.success({ review: updatedReview }));
});

const deleteReview = asyncWrapper(async (req, res, next) => {
  const { id, courseId } = req.params;

  const review = await Review.findOne({ _id: id, course: courseId });

  if (!review) {
    return next(new AppError("Review not found.", 404));
  }

  const isOwner = review.student.toString() === req.user.id.toString();
  const isAdmin = req.user.role === userRoles.ADMIN;

  if (!isOwner && !isAdmin) {
    return next(
      new AppError("You do not have permission to delete this review.", 403),
    );
  }

  await Review.findByIdAndDelete(id);

  await logAction(
    logActions.DELETE_REVIEW,
    req.user.id,
    `Deleted review ${id} on course ${courseId}`,
  );

  return res.status(200).json(jsend.success(null));
});

export {
  createReview,
  getCourseReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
