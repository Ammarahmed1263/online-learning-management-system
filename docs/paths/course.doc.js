/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve a list of all courses
 *     description: Returns an array of all courses. Accessible by anyone.
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseListResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
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
 *   post:
 *     summary: Create a new course
 *     description: Only Instructors can create courses. The instructor is set automatically from the authenticated user.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourseRequest'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCourseResponse'
 *       400:
 *         description: |
 *           Validation failed. Response data contains field-level errors.
 *           Example: `{ "status": "fail", "data": { "title": "Title is required" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Insufficient role. Message: `"You don't have permission to access this resource"`
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
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     description: Retrieve details of a specific course. Accessible by anyone.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: |
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid course ID format" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: |
 *           Course not found. Message: `"Course not found"`
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
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 *   patch:
 *     summary: Update a course
 *     description: Only the course instructor can update the course.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCourseRequest'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCourseResponse'
 *       400:
 *         description: |
 *           Validation failed (invalid ID format or invalid body fields).
 *           Example: `{ "status": "fail", "data": { "id": "Invalid course ID format" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Two possible 403 messages:
 *           - `"You don't have permission to access this resource"` — role not allowed (allowTo: instructor only)
 *           - `"You do not have permission to modify this course"` — caller is not the course's instructor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Course not found. Message: `"Course not found"`
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
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 *   delete:
 *     summary: Delete a course
 *     description: Only the course instructor can delete the course.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Course deleted. Returns `null` data.
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
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: |
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid course ID format" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Two possible 403 messages:
 *           - `"You don't have permission to access this resource"` — role not allowed (allowTo: instructor only)
 *           - `"You do not have permission to modify this course"` — caller is not the course's instructor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Course not found. Message: `"Course not found"`
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
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
