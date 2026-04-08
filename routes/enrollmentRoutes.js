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
import asyncWrapper from "../utils/asyncWrapper.js";

const router = express.Router();

router.use(authorize);

router.get("/", allowTo(userRoles.ADMIN), asyncWrapper(getAllEnrollments));

router.use(allowTo(userRoles.STUDENT));

router.post("/enroll", asyncWrapper(enrollStudent));
router.delete("/unenroll/:courseId", asyncWrapper(unEnrollStudent));
router.get("/my-courses", asyncWrapper(getMyCourses));

export default router;
