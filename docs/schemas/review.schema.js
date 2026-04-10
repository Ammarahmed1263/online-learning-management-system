/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewRaw:
 *       type: object
 *       description: |
 *         Review document as returned by POST (create) and PATCH (update).
 *         Neither student nor course is populated — both are raw ObjectId strings.
 *       properties:
 *         _id:
 *           type: string
 *           example: 64b1f2c3e4d5a6b7c8d9e0f1
 *         student:
 *           type: string
 *           description: ObjectId of the student who wrote the review
 *           example: 60d0fe4f5311236168a109c2
 *         course:
 *           type: string
 *           description: ObjectId of the reviewed course
 *           example: 60d0fe4f5311236168a109cb
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: Absolutely loved this course!
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ReviewWithStudent:
 *       type: object
 *       description: |
 *         Review document as returned by GET /courses/:courseId/reviews.
 *         student is populated with _id, userName and email. course is a raw ObjectId string.
 *       properties:
 *         _id:
 *           type: string
 *           example: 64b1f2c3e4d5a6b7c8d9e0f1
 *         student:
 *           type: object
 *           description: Populated student info
 *           properties:
 *             _id:
 *               type: string
 *               example: 60d0fe4f5311236168a109c2
 *             userName:
 *               type: string
 *               example: jane_doe
 *             email:
 *               type: string
 *               example: jane@example.com
 *         course:
 *           type: string
 *           description: ObjectId of the reviewed course
 *           example: 60d0fe4f5311236168a109cb
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 4
 *         comment:
 *           type: string
 *           example: Great course, very well explained!
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ReviewWithCourse:
 *       type: object
 *       description: |
 *         Review document as returned by GET /reviews/my-reviews.
 *         course is populated with _id, title and description. student is a raw ObjectId string.
 *       properties:
 *         _id:
 *           type: string
 *           example: 64b1f2c3e4d5a6b7c8d9e0f1
 *         student:
 *           type: string
 *           description: ObjectId of the student who wrote the review
 *           example: 60d0fe4f5311236168a109c2
 *         course:
 *           type: object
 *           description: Populated course info
 *           properties:
 *             _id:
 *               type: string
 *               example: 60d0fe4f5311236168a109cb
 *             title:
 *               type: string
 *               example: React Masterclass
 *             description:
 *               type: string
 *               example: Master React.js from scratch
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: Best course I have taken!
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateReviewRequest:
 *       type: object
 *       required: [rating, comment]
 *       properties:
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: Excellent content and very practical!
 *
 *     UpdateReviewRequest:
 *       type: object
 *       properties:
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 3
 *         comment:
 *           type: string
 *           example: Updated my opinion, still good but could improve pacing.
 *
 *     CreateReviewResponse:
 *       type: object
 *       description: Response for POST create review. Student and course are raw ObjectIds.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [review]
 *           properties:
 *             review:
 *               $ref: '#/components/schemas/ReviewRaw'
 *
 *     UpdateReviewResponse:
 *       type: object
 *       description: Response for PATCH update review. Student and course are raw ObjectIds.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [review]
 *           properties:
 *             review:
 *               $ref: '#/components/schemas/ReviewRaw'
 *
 *     CourseReviewsResponse:
 *       type: object
 *       description: Response for GET /courses/:courseId/reviews. Student is populated.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [results, reviews]
 *           properties:
 *             results:
 *               type: integer
 *               example: 3
 *             reviews:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewWithStudent'
 *
 *     MyReviewsResponse:
 *       type: object
 *       description: Response for GET /reviews/my-reviews. Course is populated with title and description.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [results, reviews]
 *           properties:
 *             results:
 *               type: integer
 *               example: 2
 *             reviews:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewWithCourse'
 */
