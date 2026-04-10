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
 *           Possible field errors:
 *           - `userName`: `"userName is required"` / `"userName must be at least 3 characters"`
 *           - `email`: `"email is required"` / `"invalid email format"`
 *           - `password`: `"password is required"` / `"password must be at least 8 characters"`
 *           - `role`: `"role must be user, student, or instructor"` (when an invalid role like `admin` is sent)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
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
 *
 * /auth:
 *   get:
 *     summary: Get all users (admin only)
 *     description: |
 *       Returns a paginated list of all registered users. Only accessible by users with the `admin` role.
 *       Supports filtering, sorting, and field limiting via query parameters (APIFeatures).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 *                     total:
 *                       type: integer
 *                       example: 15
 *                     results:
 *                       type: integer
 *                       example: 10
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Raw user document from DB (password excluded via select:false)
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 67f1f72fcad5b3f97890f111
 *                           userName:
 *                             type: string
 *                             example: ali_alaa
 *                           email:
 *                             type: string
 *                             example: ali@example.com
 *                           role:
 *                             type: string
 *                             enum: [admin, student, instructor]
 *                             example: student
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: |
 *           Token missing or invalid. Possible `data.message` values:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Role is not `admin`. `data.message`: `"You don't have permission to access this resource"`
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
 *           Unexpected server error. `message`: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
