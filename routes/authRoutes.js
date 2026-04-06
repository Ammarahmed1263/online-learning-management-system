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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new account
 *     description: Creates a user account, returns a JWT token, and returns the user profile inside the success envelope.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       403:
 *         description: Forbidden role assignment (e.g. trying to register as admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests from this IP (auth or global limiter)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
router.post("/register", validate(registerValidation), asyncWrapper(register));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Verifies credentials and returns a JWT token with the authenticated user profile.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests from this IP (auth or global limiter)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
router.post("/login", validate(loginValidation), asyncWrapper(login));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user profile
 *     description: Returns the currently authenticated user based on the bearer token.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Missing, expired, or invalid bearer token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Authenticated user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests from this IP (global limiter)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
router.get("/me", authorize, asyncWrapper(getMe));

export default router;
