/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get all enrollments (admin only)
 *     description: Returns a paginated list of all enrollments across all students and courses. Requires admin role.
 *     tags: [Enrollments]
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
 *         description: Paginated list of all enrollments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentsListResponse'
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
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
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
 *
 * /enrollments/enroll:
 *   post:
 *     summary: Enroll in a course
 *     description: |
 *       Allows an authenticated **student** to enroll in a course.
 *       - Only users with the `student` role can enroll.
 *       - A student cannot enroll in the same course twice.
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courseId]
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: MongoDB ObjectId of the course to enroll in
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Enrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollResponse'
 *       400:
 *         description: |
 *           Student is already enrolled in this course.
 *           `data.message`: `"You are already enrolled in this course."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *           Role is not `student`. `data.message`: `"You don't have permission to access this resource"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
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
 *
 * /enrollments/my-courses:
 *   get:
 *     summary: Get courses the student is enrolled in
 *     description: |
 *       Returns a list of courses the authenticated **student** is enrolled in.
 *       Only users with the `student` role can access this endpoint.
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MyCoursesResponse'
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
 *           Role is not `student`. `data.message`: `"You don't have permission to access this resource"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
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
 *
 * /enrollments/unenroll/{courseId}:
 *   delete:
 *     summary: Unenroll from a course
 *     description: |
 *       Allows an authenticated **student** to unenroll from a course they are enrolled in.
 *       Only users with the `student` role can unenroll.
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId) to unenroll from
 *     responses:
 *       200:
 *         description: Unenrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnenrollResponse'
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
 *           Role is not `student`. `data.message`: `"You don't have permission to access this resource"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Student is not enrolled in this course. `data.message`: `"You are not enrolled in this course."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
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
