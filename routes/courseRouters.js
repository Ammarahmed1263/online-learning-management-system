import express from "express";
import {
  createCourseValidator,
  updateCourseValidator,
  courseIdValidator,
} from "../validators/courseValidation.js";
import validate from "../middlewares/validateMiddleware.js";
import authorize from "../middlewares/authMiddleware.js";
import allowTo from "./../middlewares/allowToMiddleware.js";
import { userRoles } from "../utils/userRoles.js";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(
    validate(createCourseValidator),
    authorize,
    allowTo(userRoles.INSTRUCTOR),
    createCourse,
  );

router
  .route("/:id")
  .get(validate(courseIdValidator), getCourse)
  .patch(
    validate(courseIdValidator),
    validate(updateCourseValidator),
    authorize,
    allowTo(userRoles.INSTRUCTOR),
    updateCourse,
  )
  .delete(
    validate(courseIdValidator),
    authorize,
    allowTo(userRoles.INSTRUCTOR),
    deleteCourse,
  );

export default router;
