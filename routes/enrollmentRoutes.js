import express from "express";
import {
  enrollStudent,
  unEnrollStudent,
  getMyCourses,
  getAllEnrollments,
} from "../controllers/enrollmentController.js";
import authorize from "../middlewares/authMiddleware.js";
import allowTo from "../middlewares/allowToMiddleware.js";
import { userRoles } from "../utils/userRoles.js";
import validate from "../middlewares/validateMiddleware.js";
import {
  enrollValidation,
  unenrollValidation,
} from "../validators/enrollmentValidation.js";

const router = express.Router();

router.use(authorize);

router.get("/", allowTo(userRoles.ADMIN), getAllEnrollments);

router.use(allowTo(userRoles.STUDENT));

router.post("/enroll", validate(enrollValidation), enrollStudent);
router.delete(
  "/unenroll/:courseId",
  validate(unenrollValidation),
  unEnrollStudent,
);
router.get("/my-courses", getMyCourses);

export default router;
