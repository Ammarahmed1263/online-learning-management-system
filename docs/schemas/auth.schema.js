/**
 * @swagger
 * components:
 *   schemas:
 *     AuthSuccessResponse:
 *       type: object
 *       description: Success response for login or registration.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: "success"
 *         data:
 *           type: object
 *           required: [token, user]
 *           properties:
 *             token:
 *               type: string
 *               description: JWT token.
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             user:
 *               $ref: '#/components/schemas/User'
 *
 *     UserProfileResponse:
 *       type: object
 *       description: Success response for retrieving the current user's profile.
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: "success"
 *         data:
 *           type: object
 *           required: [user]
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 */
