import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import allowTo from "../middlewares/allowToMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import { userRoles } from "../utils/userRoles.js";
import {
  createReview,
  getCourseReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import {
  createReviewValidator,
  updateReviewValidator,
  reviewIdValidator,
} from "../validators/reviewValidation.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/my-reviews",
  authorize,
  allowTo(userRoles.STUDENT),
  getMyReviews,
);

router.get("/", getCourseReviews);

router.post(
  "/",
  validate(createReviewValidator),
  authorize,
  allowTo(userRoles.STUDENT),
  createReview,
);

router.patch(
  "/:id",
  validate(updateReviewValidator),
  authorize,
  allowTo(userRoles.STUDENT),
  updateReview,
);

router.delete(
  "/:id",
  validate(reviewIdValidator),
  authorize,
  allowTo(userRoles.STUDENT, userRoles.ADMIN),
  deleteReview,
);

export default router;
