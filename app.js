import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import notFound from "./utils/notFound.js";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

startServer();
