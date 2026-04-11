import express from "express";
import {
  createLesson,
  getLessons,
  getLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";

import authorize from "../middlewares/authMiddleware.js";
import allowTo from "../middlewares/allowToMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import asyncWrapper from "../utils/asyncWrapper.js";

import {
  createLessonValidation,
  updateLessonValidation,
  getLessonValidation,
  lessonCourseParamValidation,
} from "../validators/lessonValidation.js";
import { userRoles } from "../utils/userRoles.js";
import checkEnrollment from "../middlewares/checkEnrollmentMiddleware.js";

const router = express.Router({ mergeParams: true });

router.use(authorize);

router.get(
  "/",
  validate(lessonCourseParamValidation),
  asyncWrapper(checkEnrollment),
  getLessons,
);
router.get(
  "/:id",
  validate(getLessonValidation),
  asyncWrapper(checkEnrollment),
  getLesson,
);

router.use(allowTo(userRoles.INSTRUCTOR));

router.post("/", validate(createLessonValidation), createLesson);
router.put("/:id", validate(updateLessonValidation), updateLesson);
router.delete("/:id", validate(getLessonValidation), deleteLesson);

export default router;
