import { check } from "express-validator";

export const createCheckoutSessionValidator = [
  check("courseIds").isArray().withMessage("Course ids must be an array."),
  check("courseIds.*").isMongoId().withMessage("Invalid course id."),
];
