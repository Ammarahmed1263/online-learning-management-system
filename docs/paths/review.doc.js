/**
 * @swagger
 * /courses/{courseId}/reviews:
 *   get:
 *     summary: Get all reviews for a course
 *     description: Returns all reviews for a specific course. This endpoint is public and does not require authentication.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: List of reviews for the course (student field is populated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseReviewsResponse'
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
 *     summary: Submit a review for a course
 *     description: |
 *       Allows an **enrolled student** to submit a review (rating + comment) for a course.
 *       - Only students with the `student` role can submit reviews.
 *       - The student must be enrolled in the course.
 *       - A student can only submit **one review per course**.
 *     tags: [Reviews]
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
 *             $ref: '#/components/schemas/CreateReviewRequest'
 *     responses:
 *       201:
 *         description: Review created successfully (student and course are raw ObjectIds)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReviewResponse'
 *       400:
 *         description: |
 *           Two possible 400 errors:
 *           - Validation failed (e.g. rating out of range, missing comment).
 *             Example: `{ "status": "fail", "data": { "rating": "Rating must be an integer between 1 and 5" } }`
 *           - Student already reviewed this course.
 *             Message: `"You have already reviewed this course."`
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationErrorResponse'
 *                 - $ref: '#/components/schemas/ErrorResponse'
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
 *           Two possible 403 errors:
 *           - `"You don't have permission to access this resource"` — role is not `student`
 *           - `"You must be enrolled in this course to leave a review."` — student is not enrolled
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
 * /courses/{courseId}/reviews/{id}:
 *   patch:
 *     summary: Update a review
 *     description: |
 *       Allows the **student who wrote the review** to update their rating or comment.
 *       Only the original author can edit their review.
 *     tags: [Reviews]
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
 *         description: The review ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReviewRequest'
 *     responses:
 *       200:
 *         description: Review updated successfully (student and course are raw ObjectIds)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateReviewResponse'
 *       400:
 *         description: |
 *           Validation failed. Example: `{ "status": "fail", "data": { "rating": "Rating must be an integer between 1 and 5" } }`
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
 *           Two possible 403 errors:
 *           - `"You don't have permission to access this resource"` — role is not `student`
 *           - `"You do not have permission to edit this review."` — not the review's author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Review not found. Message: `"Review not found."`
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
 *     summary: Delete a review
 *     description: |
 *       Allows the **student who wrote the review** or an **admin** to delete it.
 *     tags: [Reviews]
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
 *         description: The review ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Review deleted successfully
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
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid review ID format" } }`
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
 *           Three possible 403 errors:
 *           - `"You don't have permission to access this resource"` — role is not `student` or `admin`
 *           - `"You do not have permission to delete this review."` — student trying to delete another's review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Review not found. Message: `"Review not found."`
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
 * /reviews/my-reviews:
 *   get:
 *     summary: Get all reviews submitted by the logged-in student
 *     description: Returns all reviews the authenticated student has submitted across all courses.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the student's reviews (course field is populated with title and description)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MyReviewsResponse'
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
 *           Role is not `student`. Message: `"You don't have permission to access this resource"`
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
