/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new account
 *     description: Creates a user account. Returns JWT token and user profile on success. The `admin` role cannot be assigned at registration.
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
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *       400:
 *         description: |
 *           Validation failed. Response data contains field-level errors.
 *           Example: `{ "status": "fail", "data": { "userName": "...", "email": "..." } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       403:
 *         description: |
 *           Forbidden. Message: `"Admin role cannot be assigned during registration"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: |
 *           Email already in use. Message: `"Email already exists"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded (auth limiter). Message: `"Too many login attempts from this IP, please try again after 1 hour."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Verifies credentials and returns a JWT token with the user profile on success.
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
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *       400:
 *         description: |
 *           Validation failed. Response data contains field-level errors.
 *           Example: `{ "status": "fail", "data": { "email": "...", "password": "..." } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Invalid credentials. Message: `"Invalid email or password"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded (auth limiter). Message: `"Too many login attempts from this IP, please try again after 1 hour."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
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
 *               $ref: '#/components/schemas/UserProfileResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"` (missing Authorization header)
 *           - `"Token expired, please log in again"` (JWT expired)
 *           - `"Invalid token"` (malformed JWT)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Authenticated user deleted from DB. Message: `"User not found"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded (general limiter). Message: `"Too many requests from this IP, please try again after 15 minutes."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
