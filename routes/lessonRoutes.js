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
} from "../validators/lessonValidation.js";
import { userRoles } from "../utils/userRoles.js";
import checkEnrollment from "../middlewares/checkEnrollmentMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", authorize, asyncWrapper(checkEnrollment), asyncWrapper(getLessons));

router.get(
  "/:id",
  validate(getLessonValidation),
  authorize,
  asyncWrapper(checkEnrollment),
  asyncWrapper(getLesson),
);

router.post(
  "/",
  validate(createLessonValidation),
  authorize,
  allowTo(userRoles.INSTRUCTOR),
  asyncWrapper(createLesson),
);

router.put(
  "/:id",
  validate(updateLessonValidation),
  authorize,
  allowTo(userRoles.INSTRUCTOR),
  asyncWrapper(updateLesson),
);

router.delete(
  "/:id",
  validate(getLessonValidation),
  authorize,
  allowTo(userRoles.INSTRUCTOR),
  asyncWrapper(deleteLesson),
);

export default router;
