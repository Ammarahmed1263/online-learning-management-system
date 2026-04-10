/**
 * @swagger
 * components:
 *   schemas:
 *     EnrollmentRaw:
 *       type: object
 *       description: Details of an enrollment where student and course are raw ObjectId strings
 *       properties:
 *         _id:
 *           type: string
 *           example: 64b1f2c3e4d5a6b7c8d9e0f1
 *         student:
 *           type: string
 *           example: 60d0fe4f5311236168a109c2
 *         course:
 *           type: string
 *           example: 60d0fe4f5311236168a109cb
 *         progress:
 *           type: number
 *           example: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     EnrollmentWithDetails:
 *       type: object
 *       description: Details of an enrollment where student and course are populated objects
 *       properties:
 *         _id:
 *           type: string
 *           example: 64b1f2c3e4d5a6b7c8d9e0f1
 *         student:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 60d0fe4f5311236168a109c2
 *             userName:
 *               type: string
 *               example: john_doe
 *             email:
 *               type: string
 *               example: john@example.com
 *         course:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 60d0fe4f5311236168a109cb
 *             title:
 *               type: string
 *               example: Advanced Node.js
 *             price:
 *               type: number
 *               example: 99.99
 *         progress:
 *           type: number
 *           example: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     EnrolledCourseItem:
 *       type: object
 *       description: Stripped down course details returned for a student's enrolled courses
 *       properties:
 *         title:
 *           type: string
 *           example: React Masterclass
 *         description:
 *           type: string
 *           example: Master React.js from scratch
 *         price:
 *           type: number
 *           example: 49.99
 *
 *     EnrollmentsListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             totalPages:
 *               type: integer
 *               example: 3
 *             total:
 *               type: integer
 *               example: 25
 *             results:
 *               type: integer
 *               example: 10
 *             enrollments:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnrollmentWithDetails'
 *
 *     EnrollResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             enrollment:
 *               $ref: '#/components/schemas/EnrollmentRaw'
 *
 *     MyCoursesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             results:
 *               type: integer
 *               example: 2
 *             courses:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnrolledCourseItem'
 *
 *     UnenrollResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Successfully unEnrolled from the course."
 */
