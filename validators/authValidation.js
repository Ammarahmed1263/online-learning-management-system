import { body } from "express-validator";
import { userRoles } from "../utils/userRoles.js";

export const registerValidation = [
    body("userName")
        .trim()
        .notEmpty()
        .withMessage("userName is required")
        .isLength({ min: 3 })
        .withMessage("userName must be at least 3 characters"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters"),
    body("role")
        .optional()
        .isIn([userRoles.USER, userRoles.STUDENT, userRoles.INSTRUCTOR])
        .withMessage("role must be user, student, or instructor"),
];

export const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .normalizeEmail(),
    body("password").notEmpty().withMessage("password is required"),
];
