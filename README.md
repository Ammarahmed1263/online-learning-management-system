# Express Project Best Practices

Quick reference guide for team members building this project.

---

## Table of Contents

1. [File Naming Conventions](#file-naming-conventions)
2. [Folder Structure](#folder-structure)
3. [Code Naming Standards](#code-naming-standards)
4. [JSend Response Format](#jsend-response-format)
5. [Controllers](#controllers)
6. [Models](#models-mongoose)
7. [Routes](#routes)
8. [Middleware](#middleware)
9. [Middleware Usage Rules (Project)](#middleware-usage-rules-project)
10. [Utilities Usage Rules (Project)](#utilities-usage-rules-project)
11. [Input Validation](#input-validation)
12. [Security Essentials](#security-essentials)
13. [Database Best Practices](#database-best-practices)
14. [Code Quality](#code-quality)
15. [Git Commits](#git-commit-messages)
16. [Pre-Submission Checklist](#pre-submission-checklist)

---

## File Naming Conventions

| File Type | Convention | Example |
|-----------|-----------|---------|
| Controllers | camelCase + `Controller` suffix | `userController.js` |
| Models/Schemas | PascalCase | `User.js`, `Post.js` |
| Routes | camelCase + `Routes` suffix | `userRoutes.js` |
| Middleware | camelCase + `Middleware` suffix | `authMiddleware.js` |
| Utilities | camelCase + descriptive name | `validators.js`, `helpers.js` |
| Configuration | lowercase kebab-case | `database.js`, `jwt-config.js` |

**Rule:** Use descriptive, meaningful names. No abbreviations or unclear acronyms.

---

## Folder Structure

```
models/          → Mongoose schemas only (PascalCase files)
controllers/     → Business logic (camelCase + Controller)
routes/          → API route definitions (camelCase + Routes)
middlewares/     → Auth, validation, error handlers
utils/           → Helper functions, validators, response handlers
config/          → Configuration files
public/          → Static files (CSS, JS, images)
views/           → Template files (if applicable)
```

---

## Code Naming Standards

- **Variables:** `camelCase` → `userName`, `userEmail`
- **Constants:** `UPPER_SNAKE_CASE` → `MAX_LOGIN_ATTEMPTS`, `JWT_EXPIRY`
- **Functions:** `camelCase` + descriptive verb → `getUserById()`, `createUser()`
- **Classes/Models:** `PascalCase` → `User`, `Post`, `Comment`

**Rule:** Use `const` by default, `let` for reassignable variables. Never use `var`.

---

## JSend Response Format

All endpoints **MUST** use JSend format for consistency:

```
Success (200, 201):          { "status": "success", "data": {...} }
Validation Fail (400, 422):  { "status": "fail", "data": {...}, "message": "..." }
Server Error (500):          { "status": "error", "message": "...", "code": "..." }
```

Use the shared helper from `utils/jsend.js`:
- `jsend.success(data)`
- `jsend.fail(data)`
- `jsend.error(message, data)`

Example:

```js
import jsend from "../utils/jsend.js";

return res.status(200).json(jsend.success({ user }));
```

---

## Controllers

- Extract validation to middleware, keep controllers thin
- Always wrap in try-catch blocks
- Use JSend response helpers for all responses
- Return appropriate HTTP status codes
- Use async/await for database queries
- Add JSDoc comments for each endpoint

---

## Models (Mongoose)

- Use **PascalCase** for file names
- Always include `timestamps: true` for createdAt/updatedAt
- Never expose sensitive data use "select: false` for fields like passwords
- Add indexes to frequently queried fields
- Use `enum` for restricted values
- Use `trim()` on string fields
- Always set `required: true` for mandatory fields
- Add validation rules in schema definition

---

## Routes

- Use **RESTful conventions:** GET, POST, PUT, DELETE
- Apply middleware at the route level
- Version API paths: `/api/v1/users`
- Keep routes simple - delegate logic to controllers
- Use camelCase + Routes suffix for file names
- Group related routes in separate files

---

## Middleware

- **Authentication:** Check tokens, validate permissions
- **Validation:** Use `express-validator` for input validation
- **Error Handling:** Catch errors and format responses with JSend
- Always call `next()` to pass control forward
- Place middleware in logical order
- Use camelCase + Middleware suffix for file names

---

## Middleware Usage Rules (Project)

These rules match the current middleware files in this repository.

### 1) Route-level order

Always chain route middlewares in this order:

1. `validate(...)` for request validation
2. `authorize` for JWT authentication
3. `allowTo(...)` for role authorization
4. controller handler (wrapped with `asyncWrapper`)

Example:

```js
router.post(
	"/courses",
	validate(createCourseValidation),
	authorize,
	allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
	asyncWrapper(createCourse),
);
```

### 2) Global middleware order in app startup

In the app bootstrap:

1. parser and cross-origin middleware (`express.json`, `cors`)
2. route mounting (`app.use("/api/...", routes)`)
3. `notFound`
4. `errorHandler` as the last middleware

Reason: `notFound` should catch unmatched routes and `errorHandler` must run last to format all errors.

### 3) Middleware responsibilities

- `middlewares/authMiddleware.js`: verify bearer token and attach decoded user to `req.user`.
- `middlewares/allowToMiddleware.js`: block users whose role is not in allowed roles.
- `middlewares/validateMiddleware.js`: run express-validator chains and forward validation errors.

---

## Utilities Usage Rules (Project)

Use utility files consistently to avoid duplicate logic.

### 1) `utils/appError.js`

Use `AppError` for all expected business/validation/auth errors.

```js
return next(new AppError("Course not found", 404));
```

### 2) `utils/asyncWrapper.js`

Wrap async controllers to avoid repeated try/catch blocks.

```js
router.get("/courses", asyncWrapper(getCourses));
```

### 3) `utils/jsend.js`

Return all API responses with JSend shape.

```js
return res.status(201).json(jsend.success({ course }));
```

### 4) `utils/handleValidationError.js`

Do not call directly from controllers. Let `validate` middleware attach `validationErrors` and let `errorHandler` transform it.

### 5) `utils/errorHandler.js`

Keep this as the final error formatting layer. Controllers should throw/forward errors instead of sending custom error JSON formats.

### 6) `utils/notFound.js`

Register once at app level after all route mounts so unknown endpoints produce a clean 404 AppError.

---

## Input Validation

- Validate **all** user inputs using `express-validator`
- Sanitize and normalize inputs (trim, lowercase emails, etc.)
- Provide clear, specific validation error messages
- Use whitelist validation - only allow known fields
- Validate at the route level with middleware
- Return JSend fail response (422 status) for validation errors

---

## Security Essentials

- **Environment Variables:** Store secrets in `.env` (never commit it)
- **Passwords:** Use `bcryptjs` for hashing - never store plain text
- **Authentication:** Use JWT tokens with expiry dates
- **CORS:** Configure for allowed origins only
- **Rate Limiting:** Implement on API routes to prevent abuse
- **Input Validation:** Validate and sanitize all inputs
- **Error Messages:** Don't expose sensitive data in responses
- **Never log** secrets, passwords, or tokens

---

## Database Best Practices

- Use `find()` with query builders for complex queries
- Use `.lean()` for read-only queries (better performance)
- Set appropriate indexes in schemas for frequently queried fields
- Use `select: false` for sensitive fields (passwords) to exclude by default
- Use `findByIdAndUpdate()` with `{ new: true, runValidators: true }`
- Always handle `null` responses when a document isn't found
- Use transactions for multi-document operations

---

## Code Quality

- Use **2 spaces** for indentation (not tabs)
- Add **JSDoc comments** for functions
- Keep functions focused (single responsibility)
- Don't repeat code (DRY principle)
- Use arrow functions for callbacks, regular functions for controllers
- No `console.log()` - use proper logger if available
- Remove commented-out code before committing

---

## Git Commit Messages

Follow **Conventional Commits** format:

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**
- `feat(auth): implement JWT authentication`
- `fix(user): resolve password hashing bug`
- `docs(readme): update setup instructions`

---

## Pre-Submission Checklist

- [ ] File names follow naming conventions
- [ ] Code uses JSend response format
- [ ] All inputs are validated
- [ ] Error handling is in place
- [ ] No hardcoded secrets/credentials
- [ ] Commit message follows convention
- [ ] No console.log() statements
- [ ] Code is readable with appropriate comments
- [ ] No trailing whitespace
- [ ] Try-catch blocks wrap async operations

