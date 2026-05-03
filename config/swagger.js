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
      {
        url: process.env.API_BASE_URL || "https://api.yourdomain.com/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./docs/**/*.js"],
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
