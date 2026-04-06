import { Router } from "express";
import validate from "../middlewares/validateMiddleware.js";
import authorize from "../middlewares/authMiddleware.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { getMe, login, register } from "../controllers/authController.js";
import {
    loginValidation,
    registerValidation,
} from "../validators/authValidation.js";

const router = Router();

router.post("/register", validate(registerValidation), asyncWrapper(register));
router.post("/login", validate(loginValidation), asyncWrapper(login));
router.get("/me", authorize, asyncWrapper(getMe));

export default router;
