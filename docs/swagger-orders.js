/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: User order management
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders of the current authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/CartItem'
 *                       totalAmount:
 *                         type: number
 *                       paymentIntentId:
 *                         type: string
 *                       paymentStatus:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Server error
 */
