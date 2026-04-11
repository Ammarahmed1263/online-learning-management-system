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

router.get("/my-reviews", authorize, allowTo(userRoles.STUDENT), getMyReviews);

router
  .route("/")
  .get(getCourseReviews)
  .post(
    authorize,
    allowTo(userRoles.STUDENT),
    validate(createReviewValidator),
    createReview,
  );

router
  .route("/:id")
  .patch(
    authorize,
    allowTo(userRoles.STUDENT),
    validate(updateReviewValidator),
    updateReview,
  )
  .delete(
    authorize,
    allowTo(userRoles.STUDENT, userRoles.ADMIN),
    validate(reviewIdValidator),
    deleteReview,
  );

export default router;
