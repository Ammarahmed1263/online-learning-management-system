import { body, param } from "express-validator";

export const createLessonValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("courseId").isMongoId().withMessage("Invalid courseId"),
];

export const updateLessonValidation = [
  param("id").isMongoId().withMessage("Invalid lesson id"),
];

export const getLessonValidation = [
  param("id").isMongoId().withMessage("Invalid lesson id"),
];
