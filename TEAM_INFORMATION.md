# Team Information - Online Learning Management System (LMS)

This file is the team handoff and progress tracker for responsibilities, required features, and bonus objectives.

## Project Title

Online Learning Management System (LMS)

## Team Members and Responsibilities

| Member                          | Role Title                    | Responsibilities                                                                                                                                                                                                             |
| ------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Member 1 (Ali Alaa Eldin)       | Authentication and Core Setup | Project bootstrapping, JWT authentication, role authorization foundation, shared middleware setup, base user module (register/login), env configuration                                                                      |
| Member 2 (Belal Hesham)         | The Course Catalog            | Full CRUD for Courses and Categories. Only Instructor can create courses. Instructor can only update/delete own courses. Bonus: Search and filtering for courses (keyword/category).                                         |
| Member 3 (Ahmed Khaled Elsayed) | The Content Manager           | Full CRUD for Lessons or Modules. Each Lesson must include courseId. Instructor can add lessons only for courses they own. Bonus: Pagination for lesson routes (page/limit).                                                 |
| Member 4 (Ammar & Farida)       | The Enrollment Engine         | Enrollment system linking studentId and courseId. Build checkEnrollment middleware to protect lesson access for non-enrolled users. Bonus: Student dashboard endpoint to list enrolled courses.                              |
| Member 5 (Ammar & Farida)       | Polish, Community, and Docs   | Review system with 1-5 stars and text review allowed only after enrollment. Final admin user management tasks (example: get all users). Bonus: express-rate-limit integration and Swagger API docs using swagger-ui-express. |

## Scope and Required System Features

### Core Backend Requirements

- Professional RESTful API
- MongoDB integration with Mongoose
- Authentication using JWT
- MVC architecture

### User Module

- Register user
- Login user
- Hash password with bcryptjs
- Generate JWT token
- Define roles (Admin, User)

### Authentication and Authorization

- Protect routes using JWT
- Only authenticated users can access protected routes
- Role-based access control:
  - Admin: Full CRUD
  - User: Read-only access

### Middleware

- Error handling middleware
- Authentication middleware
- Optional logger middleware

### Database

- MongoDB with Mongoose
- Schemas, Models, and Relationships

### API Requirements

- GET all and GET single
- POST create
- PUT or PATCH update
- DELETE remove

### Environment Variables

- PORT
- DB_URL
- JWT_SECRET

### Bonus Features (Optional)

- Pagination
- Search and filtering
- Sorting
- Rate limiting
- Logging system

---

## Objective Tracker

Legend: ✅ = Completed, ⬜ = Not Completed, 🟨 = In Progress

| Objective                                                | Owner          | Status | Notes                                                                                     |
| -------------------------------------------------------- | -------------- | ------ | ----------------------------------------------------------------------------------------- |
| User Register endpoint                                   | Ali Alaa Eldin | ✅     | Implemented at POST /api/v1/auth/register.                                                |
| User Login endpoint                                      | Ali Alaa Eldin | ✅     | Implemented at POST /api/v1/auth/login.                                                   |
| Password hashing with bcryptjs                           | Ali Alaa Eldin | ✅     | Implemented in User schema pre-save hook.                                                 |
| JWT generation and verification                          | Ali Alaa Eldin | ✅     | JWT issued on login/register and verified by auth middleware for protected routes.        |
| Roles setup (Admin, User, Instructor, Student as needed) | Ali Alaa Eldin | ✅     | Roles extended to include Instructor and Student in role constants and user schema enum.  |
| Course CRUD                                              | Belal Hesham   | ✅     |                                                                                           |
| Category CRUD                                            | Belal Hesham   | ✅     |                                                                                           |
| Instructor-only course creation                          | Belal Hesham   | ✅     |                                                                                           |
| Instructor can edit/delete only own courses              | Belal Hesham   | ✅     |                                                                                           |
| Course search and filtering bonus                        | Belal Hesham   | ✅     |                                                                                           |
| Lesson or Module CRUD                                    | Ahmed Khaled   | ✅     |                                                                                           |
| Enforce lesson courseId relation                         | Ahmed Khaled   | ✅     |                                                                                           |
| Only course owner instructor can add lesson              | Ahmed Khaled   | ✅     |                                                                                           |
| Lesson pagination bonus                                  | Ahmed Khaled   | ✅     |                                                                                           |
| Enrollment create/list/remove flow                       | Ammar          | ✅     |                                                                                           |
| checkEnrollment middleware                               | Farida         | ✅     |                                                                                           |
| Protect lesson GET routes by enrollment                  | Farida         | ✅     |                                                                                           |
| Student dashboard my-courses bonus                       | Ammar          | ✅     |                                                                                           |
| Review model and CRUD                                    | Farida         | ✅     |                                                                                           |
| Only enrolled student can review                         | Farida         | ✅     |                                                                                           |
| 1-5 star validation and text review                      | Farida         | ✅     |                                                                                           |
| Admin get all users endpoint finalization                | Ammar          | ✅     |                                                                                           |
| Global express-rate-limit bonus                          | Ammar          | ✅     |                                                                                           |
| Swagger docs with swagger-ui-express bonus               | Farida         | ✅     |                                                                                           |
| Error handling middleware                                | Ammar          | ✅     | Global notFound + errorHandler are wired in app startup.                                  |
| Authentication middleware                                | Ammar          | ✅     |                                                                                           |
| RESTful conventions applied                              | Team           | 🟨     |                                                                                           |
| MongoDB models and relationships complete                | Team           | 🟨     | Database connection and User model exist; course/lesson/enrollment relationships pending. |
| Environment variables configured                         | Team           | ✅     |                                                                                           |
| GitHub repository deliverable complete                   | Team           | 🟨     |                                                                                           |
| API documentation deliverable complete                   | Team           | 🟨     |                                                                                           |

## How to Use This File

- Update the Status column as work progresses.
- Keep Notes short and specific (endpoint path, model name, PR link, or blocker).
- Review this file during team syncs to avoid overlap and missed requirements.
