/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       description: Standard error response for operational 4xx errors (AppError without extra data).
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [fail]
 *           example: "fail"
 *         data:
 *           type: object
 *           required: [message]
 *           properties:
 *             message:
 *               type: string
 *               description: Human-readable error message from the code.
 *               example: "Resource not found"
 *
 *     ValidationErrorResponse:
 *       type: object
 *       description: Validation errors from express-validator / validateMiddleware.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [fail]
 *           example: "fail"
 *         data:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           description: Field errors keyed by field name.
 *           example:
 *             email: "invalid email format"
 *             password: "password is required"
 *
 *     RateLimitResponse:
 *       type: object
 *       description: Response from express-rate-limit middleware (auth limiter or global limiter).
 *       required: [status, message]
 *       properties:
 *         status:
 *           type: string
 *           enum: [fail]
 *           example: "fail"
 *         message:
 *           type: string
 *           description: Limiter message text configured in rateLimiter middleware.
 *           example: "Too many requests from this IP, please try again after 15 minutes."
 *
 *     InternalErrorResponse:
 *       type: object
 *       description: Unexpected server error response returned by the global error handler.
 *       required: [status, message, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [error]
 *           example: "error"
 *         message:
 *           type: string
 *           example: "Something went wrong"
 *         data:
 *           nullable: true
 *           example: null
 */
