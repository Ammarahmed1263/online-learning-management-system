/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required: [name]
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: The description of the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: Web Development
 *         description: Learn how to build modern web applications
 *         createdAt: 2023-06-21T10:00:00Z
 *         updatedAt: 2023-06-21T10:00:00Z
 *
 *     CreateCategoryRequest:
 *       type: object
 *       required: [name]
 *       properties:
 *         name:
 *           type: string
 *           example: Web Development
 *         description:
 *           type: string
 *           example: Learn how to build modern web applications
 *
 *     CategoryResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [category]
 *           properties:
 *             category:
 *               $ref: '#/components/schemas/Category'
 *
 *     CategoryListResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: success
 *         data:
 *           type: object
 *           required: [categories]
 *           properties:
 *             categories:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
