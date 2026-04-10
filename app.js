import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import notFound from "./utils/notFound.js";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import courseRouter from "./routes/courseRouters.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import enrollmentsRoutes from "./routes/enrollmentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { generalLimiter, authLimiter } from "./config/rateLimiter.js";
import { setupSwagger } from "./config/swagger.js";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Trust first proxy for rate limiting "production only"
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use("/api", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use("/api/auth", authRoutes);

app.use("/api/courses/:courseId/lessons", lessonRoutes);
app.use("/api/courses", courseRouter);
app.use("/api/categories", categoryRouter);

app.use("/api/enrollments", enrollmentsRoutes);
app.use("/api/courses/:courseId/reviews", reviewRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();
