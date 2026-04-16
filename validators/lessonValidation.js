import { body, param } from "express-validator";

export const createLessonValidation = [
    param("courseId").isMongoId().withMessage("Invalid courseId format"),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .isLength({ min: 3, max: 200 })
        .withMessage("Title must be between 3 and 200 characters"),

    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .bail()
        .isString()
        .withMessage("Content must be a string")
        .bail()
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters"),
];

export const updateLessonValidation = [
    param("id").isMongoId().withMessage("Invalid lesson id"),
];

export const getLessonValidation = [
    param("id").isMongoId().withMessage("Invalid lesson id"),
];

export const lessonCourseParamValidation = [
    param("courseId").isMongoId().withMessage("Invalid courseId format"),
];
