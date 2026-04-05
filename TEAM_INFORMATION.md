# Team Information - Online Learning Management System (LMS)

This file is the team handoff and progress tracker for responsibilities, required features, and bonus objectives.

## Project Title

Online Learning Management System (LMS)

## Team Members and Responsibilities

| Member                    | Role Title                    | Responsibilities                                                                                                                                                                                                             |
| ------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Member 1 (Ali Alaa Eldin) | Authentication and Core Setup | Project bootstrapping, JWT authentication, role authorization foundation, shared middleware setup, base user module (register/login), env configuration                                                                      |
| Member 2                  | The Course Catalog            | Full CRUD for Courses and Categories. Only Instructor can create courses. Instructor can only update/delete own courses. Bonus: Search and filtering for courses (keyword/category).                                         |
| Member 3                  | The Content Manager           | Full CRUD for Lessons or Modules. Each Lesson must include courseId. Instructor can add lessons only for courses they own. Bonus: Pagination for lesson routes (page/limit).                                                 |
| Member 4                  | The Enrollment Engine         | Enrollment system linking studentId and courseId. Build checkEnrollment middleware to protect lesson access for non-enrolled users. Bonus: Student dashboard endpoint to list enrolled courses.                              |
| Member 5                  | Polish, Community, and Docs   | Review system with 1-5 stars and text review allowed only after enrollment. Final admin user management tasks (example: get all users). Bonus: express-rate-limit integration and Swagger API docs using swagger-ui-express. |

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

| Area     | Objective                                                | Owner          | Status | Notes                                                                                     |
| -------- | -------------------------------------------------------- | -------------- | ------ | ----------------------------------------------------------------------------------------- |
| Member 1 | User Register endpoint                                   | Ali Alaa Eldin | ⬜     |                                                                                           |
| Member 1 | User Login endpoint                                      | Ali Alaa Eldin | ⬜     |                                                                                           |
| Member 1 | Password hashing with bcryptjs                           | Ali Alaa Eldin | ✅     | Implemented in User schema pre-save hook.                                                 |
| Member 1 | JWT generation and verification                          | Ali Alaa Eldin | 🟨     | Verification middleware exists; login/register token generation not implemented yet.      |
| Member 1 | Roles setup (Admin, User, Instructor, Student as needed) | Ali Alaa Eldin | 🟨     | Admin/User roles are implemented; Instructor/Student not added yet.                       |
| Member 2 | Course CRUD                                              | Belal Hesham   | ⬜     |                                                                                           |
| Member 2 | Category CRUD                                            | Belal Hesham   | ⬜     |                                                                                           |
| Member 2 | Instructor-only course creation                          | Belal Hesham   | ⬜     |                                                                                           |
| Member 2 | Instructor can edit/delete only own courses              | Belal Hesham   | ⬜     |                                                                                           |
| Member 2 | Course search and filtering bonus                        | Belal Hesham   | ⬜     |                                                                                           |
| Member 3 | Lesson or Module CRUD                                    | Member 3       | ⬜     |                                                                                           |
| Member 3 | Enforce lesson courseId relation                         | Member 3       | ⬜     |                                                                                           |
| Member 3 | Only course owner instructor can add lesson              | Member 3       | ⬜     |                                                                                           |
| Member 3 | Lesson pagination bonus                                  | Member 3       | ⬜     |                                                                                           |
| Member 4 | Enrollment create/list/remove flow                       | Member 4       | ⬜     |                                                                                           |
| Member 4 | checkEnrollment middleware                               | Member 4       | ⬜     |                                                                                           |
| Member 4 | Protect lesson GET routes by enrollment                  | Member 4       | ⬜     |                                                                                           |
| Member 4 | Student dashboard my-courses bonus                       | Member 4       | ⬜     |                                                                                           |
| Member 5 | Review model and CRUD                                    | Member 5       | ⬜     |                                                                                           |
| Member 5 | Only enrolled student can review                         | Member 5       | ⬜     |                                                                                           |
| Member 5 | 1-5 star validation and text review                      | Member 5       | ⬜     |                                                                                           |
| Member 5 | Admin get all users endpoint finalization                | Member 5       | ⬜     |                                                                                           |
| Member 5 | Global express-rate-limit bonus                          | Member 5       | ⬜     |                                                                                           |
| Member 5 | Swagger docs with swagger-ui-express bonus               | Member 5       | ⬜     |                                                                                           |
| Shared   | Error handling middleware                                | Team           | ✅     | Global notFound + errorHandler are wired in app startup.                                  |
| Shared   | Authentication middleware                                | Team           | ✅     |                                                                                           |
| Shared   | RESTful conventions applied                              | Team           | ⬜     |                                                                                           |
| Shared   | MongoDB models and relationships complete                | Team           | 🟨     | Database connection and User model exist; course/lesson/enrollment relationships pending. |
| Shared   | Environment variables configured                         | Team           | ✅     |                                                                                           |
| Shared   | GitHub repository deliverable complete                   | Team           | ⬜     |                                                                                           |
| Shared   | API documentation deliverable complete                   | Team           | ⬜     |                                                                                           |

## How to Use This File

- Update the Status column as work progresses.
- Keep Notes short and specific (endpoint path, model name, PR link, or blocker).
- Review this file during team syncs to avoid overlap and missed requirements.
