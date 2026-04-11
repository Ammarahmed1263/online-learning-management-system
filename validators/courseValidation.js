import { body, param } from "express-validator";

export const createCourseValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string"),

  body("price")
    .exists()
    .withMessage("Price is required")
    .bail()
    .notEmpty()
    .withMessage("Price cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Price must be a number"),

  body("category")
    .exists()
    .withMessage("Category id is required")
    .bail()
    .notEmpty()
    .withMessage("Category id cannot be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid category ID format"),
];

export const updateCourseValidator = [
  body("title")
    .optional()
    .trim()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .bail()
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID format"),
];

export const courseIdValidator = [
  param("id").isMongoId().withMessage("Invalid course ID format"),
];
