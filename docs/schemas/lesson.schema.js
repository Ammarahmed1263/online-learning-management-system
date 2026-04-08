/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required: [title, content, courseId, instructorId]
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the lesson
 *         title:
 *           type: string
 *           description: The title of the lesson
 *         content:
 *           type: string
 *           description: The content of the lesson
 *         courseId:
 *           type: string
 *           description: The id of the course this lesson belongs to
 *         instructorId:
 *           type: string
 *           description: The id of the instructor who created the lesson
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60d0fe4f5311236168a109cc
 *         title: Introduction to Hooks
 *         content: Basic hooks like useState and useEffect
 *         courseId: 60d0fe4f5311236168a109cb
 *         instructorId: 60d0fe4f5311236168a109c1
 *         createdAt: 2023-06-21T10:00:00Z
 *         updatedAt: 2023-06-21T10:00:00Z
 *
 *     CreateLessonRequest:
 *       type: object
 *       required: [title, content, courseId]
 *       properties:
 *         title:
 *           type: string
 *           example: Introduction to Hooks
 *         content:
 *           type: string
 *           example: Basic hooks like useState and useEffect
 *         courseId:
 *           type: string
 *           example: 60d0fe4f5311236168a109cb
 *
 *     UpdateLessonRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Advanced Hooks
 *         content:
 *           type: string
 *           example: useMemo and useCallback
 *
 *     LessonResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [lesson]
 *           properties:
 *             lesson:
 *               $ref: '#/components/schemas/Lesson'
 *
 *     LessonListResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [page, totalPages, total, lessons]
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             totalPages:
 *               type: integer
 *               example: 5
 *             total:
 *               type: integer
 *               example: 50
 *             lessons:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *
 *     DeleteLessonResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [message]
 *           properties:
 *             message:
 *               type: string
 *               example: Lesson deleted successfully
 */
