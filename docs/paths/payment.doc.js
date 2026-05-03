/**
 * @swagger
 * /payments/create-checkout-session:
 *   post:
 *     summary: Create checkout session
 *     description: Creates a Stripe checkout session for a specific course.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items: 
 *               type: string
 *               description: The course ids (MongoDB ObjectIds)
 */
