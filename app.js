import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import notFound from "./utils/notFound.js";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js"
import courseRouter from "./routes/courseRouters.js"
import { generalLimiter, authLimiter } from "./config/rateLimiter.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();

dotenv.config();

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // Trust first proxy for rate limiting "production only"
}

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use("/api", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use("/api/auth", authRoutes);

app.use("/category", categoryRouter)

app.use("/course", courseRouter)

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();
