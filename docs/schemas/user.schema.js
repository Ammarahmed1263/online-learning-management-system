/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Public user profile fields.
 *       properties:
 *         id:
 *           type: string
 *           description: User identifier (_id from MongoDB).
 *           example: "67f1f72fcad5b3f97890f111"
 *         userName:
 *           type: string
 *           minLength: 3
 *           example: "ali_alaa"
 *         email:
 *           type: string
 *           format: email
 *           example: "ali@example.com"
 *         role:
 *           type: string
 *           enum: [admin, user, student, instructor]
 *           example: "student"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserRegisterRequest:
 *       type: object
 *       description: Request payload for creating a new LMS account.
 *       required: [userName, email, password]
 *       properties:
 *         userName:
 *           type: string
 *           description: Unique display name for the user account.
 *           minLength: 3
 *           example: "ali_alaa"
 *         email:
 *           type: string
 *           format: email
 *           description: Valid email address used for login.
 *           example: "ali@example.com"
 *         password:
 *           type: string
 *           description: Account password (min 8 characters).
 *           minLength: 8
 *           example: "12345678"
 *         role:
 *           type: string
 *           description: Optional role (cannot be admin at registration).
 *           enum: [user, student, instructor]
 *           example: "student"
 *
 *     UserLoginRequest:
 *       type: object
 *       description: Request payload for user authentication.
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Registered email address.
 *           example: "ali@example.com"
 *         password:
 *           type: string
 *           description: User password.
 *           minLength: 1
 *           example: "12345678"
 */
