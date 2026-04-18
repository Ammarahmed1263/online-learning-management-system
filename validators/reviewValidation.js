import { body, param } from "express-validator";

export const createReviewValidator = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course ID format"),

  body("rating")
    .exists()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comment")
    .exists()
    .withMessage("Comment is required")
    .bail()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .bail()
    .isString()
    .withMessage("Comment must be a string"),
];

export const updateReviewValidator = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course ID format"),

  param("id")
    .isMongoId()
    .withMessage("Invalid review ID format"),

  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comment")
    .optional()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .bail()
    .isString()
    .withMessage("Comment must be a string"),
];

export const courseIdValidator = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course ID format"),
];

export const reviewIdValidator = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course ID format"),

  param("id")
    .isMongoId()
    .withMessage("Invalid review ID format"),
];
