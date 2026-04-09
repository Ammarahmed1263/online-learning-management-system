/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   get:
 *     summary: Retrieve a list of all lessons
 *     description: Returns a paginated list of lessons for a specific course. Requires authentication and enrollment in that course (or admin/instructor role).
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
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
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of lessons
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LessonListResponse'
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
 *           Access denied for non-enrolled students. Message:
 *           `"Access denied. You must be enrolled in this course to view its lessons."`
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
 *   post:
 *     summary: Create a new lesson
 *     description: Only the instructor of the target course can add lessons to it.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLessonRequest'
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LessonResponse'
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
 *           Two possible 403 messages:
 *           - `"You don't have permission to access this resource"` — role not allowed (allowTo: instructor only)
 *           - `"Not authorized"` — authenticated instructor is not the instructor of the target course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Target course not found. Message: `"Course not found"`
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
 * /courses/{courseId}/lessons/{id}:
 *   get:
 *     summary: Get a lesson by ID
 *     description: Retrieve details of a specific lesson for a specific course. Requires authentication and enrollment in that course (or admin/instructor role).
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The lesson ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Lesson details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LessonResponse'
 *       400:
 *         description: |
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid lesson ID format" } }`
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
 *           Access denied for non-enrolled students. Message:
 *           `"Access denied. You must be enrolled in this course to view its lessons."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Lesson not found. Message: `"Lesson not found"`
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
 *   put:
 *     summary: Update a lesson
 *     description: Only the instructor who created the lesson can update it.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The lesson ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLessonRequest'
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LessonResponse'
 *       400:
 *         description: |
 *           Validation failed (invalid ID format or invalid body fields).
 *           Example: `{ "status": "fail", "data": { "id": "Invalid lesson ID format" } }`
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
 *           - `"Not authorized"` — authenticated instructor is not the lesson's creator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Lesson not found. Message: `"Lesson not found"`
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
 *     summary: Delete a lesson
 *     description: Only the instructor who created the lesson can delete it.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The lesson ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: |
 *           Lesson deleted successfully. Message: `"Lesson deleted successfully"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteLessonResponse'
 *       400:
 *         description: |
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid lesson ID format" } }`
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
 *           - `"Not authorized"` — authenticated instructor is not the lesson's creator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Lesson not found. Message: `"Lesson not found"`
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
