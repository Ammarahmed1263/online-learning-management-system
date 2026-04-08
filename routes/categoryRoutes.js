import express from "express";
import { createCategoryValidator, categoryIdValidator } from "../validators/categoryValidation.js";
import validate from '../middlewares/validateMiddleware.js';
import authorize from '../middlewares/authMiddleware.js';
import allowTo from './../middlewares/allowToMiddleware.js';
import { userRoles } from "../utils/userRoles.js";
import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js'

const router = express.Router();

router.route('/').get(getCategories)
    .post(validate(createCategoryValidator),
        authorize,
        allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
        createCategory)

router.route('/:id').get(validate(categoryIdValidator), getCategory)
    .patch(validate(categoryIdValidator),
        validate(createCategoryValidator),
        authorize,
        allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
        updateCategory)

    .delete(validate(categoryIdValidator),
        authorize,
        allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
        deleteCategory)


export default router;