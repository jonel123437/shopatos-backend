/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - name
 *               - price
 *               - quantity
 *               - image
 *               - category
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f8f0a1c5b4e0d3a1234567
 *               name:
 *                 type: string
 *                 example: Cool Sneakers
 *               price:
 *                 type: string
 *                 example: $50
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 example: /images/product1.png
 *               category:
 *                 type: string
 *                 example: Trending
 *     responses:
 *       200:
 *         description: Product added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove a product from the user's cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f8f0a1c5b4e0d3a1234567
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found in cart
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/update:
 *   post:
 *     summary: Update the quantity of a product in the user's cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - delta
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f8f0a1c5b4e0d3a1234567
 *               delta:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found in cart
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Create an order (checkout)
 *     description: Moves items from user cart to order and clears the cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *                 description: PayMongo payment intent ID
 *             required:
 *               - paymentIntentId
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalAmount:
 *                   type: number
 *                 paymentIntentId:
 *                   type: string
 *                 paymentStatus:
 *                   type: string
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to create order
 */
