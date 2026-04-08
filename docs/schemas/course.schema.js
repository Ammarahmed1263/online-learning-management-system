/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required: [title, description, price, category, instructor]
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the course
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         price:
 *           type: number
 *           description: The price of the course
 *         category:
 *           type: string
 *           description: The id of the category this course belongs to
 *         instructor:
 *           type: string
 *           description: The id of the instructor who created the course
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60d0fe4f5311236168a109cb
 *         title: React Masterclass
 *         description: Master React.js from scratch
 *         price: 49.99
 *         category: 60d0fe4f5311236168a109ca
 *         instructor: 60d0fe4f5311236168a109c1
 *         createdAt: 2023-06-21T10:00:00Z
 *         updatedAt: 2023-06-21T10:00:00Z
 *
 *     CreateCourseRequest:
 *       type: object
 *       description: The instructor is set automatically from the authenticated user.
 *       required: [title, description, price, category]
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
 *         category:
 *           type: string
 *           description: ObjectId of the category
 *           example: 60d0fe4f5311236168a109ca
 *
 *     UpdateCourseRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Advanced React Techniques
 *         description:
 *           type: string
 *           example: Deep dive into React hooks and performance
 *         price:
 *           type: number
 *           example: 59.99
 *         category:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *
 *     CourseResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [course]
 *           properties:
 *             course:
 *               $ref: '#/components/schemas/Course'
 *
 *     CreateCourseResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [newCourse]
 *           properties:
 *             newCourse:
 *               $ref: '#/components/schemas/Course'
 *
 *     UpdateCourseResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [updatedCourse]
 *           properties:
 *             updatedCourse:
 *               $ref: '#/components/schemas/Course'
 *
 *     CourseListResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [courses]
 *           properties:
 *             courses:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
