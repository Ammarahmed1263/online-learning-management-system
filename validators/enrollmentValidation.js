import { body, param } from "express-validator";

export const enrollValidation = [
  body("courseId")
    .exists()
    .withMessage("Course ID is required")
    .bail()
    .notEmpty()
    .withMessage("Course ID cannot be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid course ID format"),
];

export const unenrollValidation = [
  param("courseId").isMongoId().withMessage("Invalid course ID format"),
];
