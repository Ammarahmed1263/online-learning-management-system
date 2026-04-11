import express from "express";
import {
  createCategoryValidator,
  categoryIdValidator,
} from "../validators/categoryValidation.js";
import validate from "../middlewares/validateMiddleware.js";
import authorize from "../middlewares/authMiddleware.js";
import allowTo from "./../middlewares/allowToMiddleware.js";
import { userRoles } from "../utils/userRoles.js";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    authorize,
    allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    validate(createCategoryValidator),
    createCategory,
  );

router
  .route("/:id")
  .get(validate(categoryIdValidator), getCategory)
  .patch(
    authorize,
    allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    validate(categoryIdValidator),
    validate(createCategoryValidator),
    updateCategory,
  )

  .delete(
    authorize,
    allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    validate(categoryIdValidator),
    deleteCategory,
  );

export default router;
