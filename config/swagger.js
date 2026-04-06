import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const appPort = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "LMS API Documentation",
      version: "1.0.0",
      description:
        "The official documentation for the Learning Management System API.",
    },
    servers: [
      {
        url: `http://localhost:${appPort}/api`,
        description: "Development server",
      },
      // Production server - uncomment and update when ready
      // {
      //   url: process.env.API_BASE_URL || "https://api.yourdomain.com/api",
      //   description: "Production server",
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        UserRegisterRequest: {
          type: "object",
          description: "Request payload for creating a new LMS account.",
          required: ["userName", "email", "password"],
          properties: {
            userName: {
              type: "string",
              description: "Unique display name for the user account.",
              minLength: 3,
              example: "ali_alaa",
            },
            email: {
              type: "string",
              format: "email",
              description: "Valid email address used for login.",
              example: "ali@example.com",
            },
            password: {
              type: "string",
              description: "Account password (min 8 characters).",
              minLength: 8,
              example: "12345678",
            },
            role: {
              type: "string",
              description: "Optional role (cannot be admin at registration).",
              enum: ["user", "student", "instructor"],
              example: "student",
            },
          },
        },

        UserLoginRequest: {
          type: "object",
          description: "Request payload for user authentication.",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Registered email address.",
              example: "ali@example.com",
            },
            password: {
              type: "string",
              description: "User password.",
              minLength: 1,
              example: "12345678",
            },
          },
        },

        User: {
          type: "object",
          description: "Public user profile fields.",
          properties: {
            id: {
              type: "string",
              description: "User identifier (_id from MongoDB).",
              example: "67f1f72fcad5b3f97890f111",
            },
            userName: { type: "string", minLength: 3, example: "ali_alaa" },
            email: {
              type: "string",
              format: "email",
              example: "ali@example.com",
            },
            role: {
              type: "string",
              enum: ["admin", "user", "student", "instructor"],
              example: "student",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        AuthResponse: {
          type: "object",
          description: "Standard success response envelope (jsend style).",
          properties: {
            status: { type: "string", enum: ["success"], example: "success" },
            token: {
              type: "string",
              description: "JWT token (returned on register/login only).",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            data: {
              type: "object",
              properties: {
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
          required: ["status", "data"],
        },

        ErrorResponse: {
          type: "object",
          description:
            "Standard error response for operational errors (AppError).",
          properties: {
            status: { type: "string", enum: ["fail"], example: "fail" },
            data: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Human-readable error message.",
                  example: "Invalid email or password",
                },
              },
              required: ["message"],
            },
          },
          required: ["status", "data"],
        },

        ValidationErrorResponse: {
          type: "object",
          description:
            "Validation errors from express-validator / validateMiddleware.",
          properties: {
            status: { type: "string", enum: ["fail"], example: "fail" },
            data: {
              type: "object",
              additionalProperties: { type: "string" },
              description: "Field errors keyed by field name.",
              example: {
                email: "invalid email format",
                password: "password is required",
              },
            },
          },
          required: ["status", "data"],
        },

        RateLimitResponse: {
          type: "object",
          description:
            "Response from express-rate-limit middleware (auth limiter or global limiter).",
          properties: {
            status: { type: "string", enum: ["fail"], example: "fail" },
            message: {
              type: "string",
              description:
                "Limiter message text configured in rateLimiter middleware.",
              example:
                "Too many requests from this IP, please try again after 15 minutes.",
            },
          },
          required: ["status", "message"],
        },

        InternalErrorResponse: {
          type: "object",
          description:
            "Unexpected server error response returned by the global error handler.",
          properties: {
            status: { type: "string", enum: ["error"], example: "error" },
            message: {
              type: "string",
              example: "Something went wrong",
            },
            data: {
              nullable: true,
              example: null,
            },
          },
          required: ["status", "message", "data"],
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions = {
  swaggerOptions: {
    responseInterceptor: (res) => {
      if (
        res.url.includes("/api/auth/login") ||
        res.url.includes("/api/auth/register")
      ) {
        try {
          const responseData = JSON.parse(res.data);
          if (responseData.data.token) {
            setTimeout(() => {
              window.ui.authActions.authorize({
                bearerAuth: {
                  name: "bearerAuth",
                  schema: {
                    type: "http",
                    in: "header",
                    name: "Authorization",
                    description: "",
                  },
                  value: responseData.data.token,
                },
              });
            }, 0);
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
        }
      }
      return res;
    },
  },
};

export const setupSwagger = (app) => {
  if (process.env.NODE_ENV === "production") {
    console.log("Swagger UI is disabled in production environment.");
    return;
  }

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions),
  );
  console.log(`Swagger UI available at http://localhost:${appPort}/api-docs`);
};
