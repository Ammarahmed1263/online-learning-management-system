/**
 * @swagger
 * /payments/create-checkout-session:
 *   post:
 *     summary: Create checkout session
 *     description: Creates a Stripe checkout session for a specific course. Accessible by students and instructors.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseIds
 *             properties:
 *               courseIds:
 *                 type: array
 *                 items: 
 *                   type: string
 *                   description: The course ids (MongoDB ObjectIds)
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionUrl:
 *                       type: string
 *                       example: "https://checkout.stripe.com/c/pay/cs_test_..."
 *
 * /payments/checkout-session/{sessionId}:
 *   get:
 *     summary: Get checkout session details
 *     description: Retrieves details of a completed Stripe checkout session to display a receipt. No authentication required.
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Stripe Checkout Session ID
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: string
 *                       description: The Stripe Payment Intent ID
 *                       example: "pi_3..."
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     totalAmount:
 *                       type: number
 *                       example: 1500
 *                     currency:
 *                       type: string
 *                       example: "egp"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Complete React Bootcamp - 1"]
 */
