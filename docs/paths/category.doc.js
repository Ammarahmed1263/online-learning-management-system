/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of all categories
 *     description: Returns an array of all categories. Accessible by anyone.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryListResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 *   post:
 *     summary: Create a new category
 *     description: Only Admins and Instructors can create categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: |
 *           Validation failed. Response data contains field-level errors.
 *           Example: `{ "status": "fail", "data": { "name": "Category name is required" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Insufficient role. Message: `"You don't have permission to access this resource"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve details of a specific category. Accessible by anyone.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: |
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid category ID format" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: |
 *           Category not found. Message: `"Category not found"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 *   patch:
 *     summary: Update a category
 *     description: Only Admins and Instructors can update categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: |
 *           Validation failed (invalid ID format or invalid body fields).
 *           Example: `{ "status": "fail", "data": { "id": "Invalid category ID format" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Insufficient role. Message: `"You don't have permission to access this resource"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Category not found. Message: `"Category not found"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 *
 *   delete:
 *     summary: Delete a category
 *     description: Only Admins and Instructors can delete categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Category deleted. Returns `null` data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                   example: success
 *                 data:
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: |
 *           Invalid ID format. Example: `{ "status": "fail", "data": { "id": "Invalid category ID format" } }`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: |
 *           Token missing or invalid. Possible messages:
 *           - `"No token provided"`
 *           - `"Token expired, please log in again"`
 *           - `"Invalid token"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: |
 *           Insufficient role. Message: `"You don't have permission to access this resource"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: |
 *           Category not found. Message: `"Category not found"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: |
 *           Rate limit exceeded. Message: `"Too many requests from this IP, please try again after 15 minutes."`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: |
 *           Unexpected server error. Message: `"Something went wrong"`
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
