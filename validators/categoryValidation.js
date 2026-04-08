import { body, param } from "express-validator";

export const createCategoryValidator = [
    body("name")
        .exists()
        .withMessage("Category name is required")
        .bail()
        .notEmpty()
        .withMessage("Category name cannot be empty")
        .bail()
        .isString()
        .withMessage("Category name must be a string"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
];

export const categoryIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category ID format")
];