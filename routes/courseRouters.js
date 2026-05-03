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
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(
    authorize,
    allowTo(userRoles.INSTRUCTOR),
    upload.single("image"),
    validate(createCourseValidator),
    createCourse,
  );

router
  .route("/:id")
  .get(validate(courseIdValidator), getCourse)
  .patch(
    authorize,
    allowTo(userRoles.INSTRUCTOR),
    upload.single("image"),
    validate(courseIdValidator),
    validate(updateCourseValidator),
    updateCourse,
  )
  .delete(
    authorize,
    allowTo(userRoles.INSTRUCTOR),
    validate(courseIdValidator),
    deleteCourse,
  );

export default router;
