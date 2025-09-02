/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: PayMongo Payment API
 */

/**
 * @swagger
 * /api/payment/intent:
 *   post:
 *     summary: Create a PayMongo Payment Intent
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 data:
 *                   id: pi_xxx
 *                   attributes:
 *                     amount: 10000
 *                     currency: PHP
 *                     status: pending
 *       500:
 *         description: Server error
 */
